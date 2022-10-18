import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
//import { Noticia } from '../clases/noticia';
import { ActiveUser } from 'src/app/clases/active-user';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database: SQLiteObject;
  tbUsuario: string = "CREATE TABLE IF NOT EXISTS activeUser(id INTEGER PRIMARY KEY autoincrement, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL);";
  listaUsuarios = new BehaviorSubject([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, 
    private platform:Platform, 
    public toastController: ToastController) { 
      this.presentToast("Componente cargado");
      this.crearBD();
    }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        //llamo a crear la tabla
        this.crearTabla();
      }).catch(e => this.presentToast(e));
    })
  };

  async crearTabla() {
    try {
      await this.database.executeSql(this.tbUsuario,[]);
      //await this.database.executeSql(this.registro,[]);
      this.presentToast("Tabla creada");
      this.cargarUsuario();
      this.isDbReady.next(true); 
    } catch (error) {
      this.presentToast("Error en Crear Tabla: "+error);
    }
  };

  //SELECT * FROM activeUser
  cargarUsuario() {
    return this.database.executeSql('SELECT * FROM activeUser',[]).then(res=>{
      let items:ActiveUser[]=[];

      //Devolver al usuario con la id mas alta en la tabla, al fin y al cabo, solo deberia guardar 1 usuario
      if(res.rows.length>0){
        items.push({
          id:res.rows.item(res.rows.length-1).id,
          username:res.rows.item(res.rows.length-1).username,
          password:res.rows.item(res.rows.length-1).password
        });  
        /*
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            username:res.rows.item(i).username,
            password:res.rows.item(i).password
          });          
        }
        */

      }

      this.listaUsuarios.next(items);
    });
  };

  addUsuario(username,password){
    let data=[username,password];
    return this.database.executeSql('INSERT INTO activeUser(username,password) VALUES(?,?)',data)
    .then(()=>{
      this.cargarUsuario();
    });
  };

  updateUsuario(id,username,password){
    let data=[username,password,id];
    return this.database.executeSql('UPDATE activeUser SET username=?, password=? WHERE id=?',data)
    .then(()=>{
      this.cargarUsuario();
    });
  };

  deleteAllUsuarios(){
    return this.database.executeSql('DELETE FROM activeUser').then(() =>{
      this.presentToast("Usuarios eliminados");
    });
  };

  deleteUsuario(id){
    return this.database.executeSql('DELETE FROM activeUser WHERE id=?',[id])
    .then(()=>{
      this.cargarUsuario();
    });
  };

  dbState(){
    return this.isDbReady.asObservable();
  };

  fetchUsuario(): Observable<ActiveUser[]> {
    return this.listaUsuarios.asObservable();
  };

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  };
}
