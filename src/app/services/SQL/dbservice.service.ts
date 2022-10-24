import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
//import { Noticia } from '../clases/noticia';

//Importar las clases de las tablas
import { ActiveUser } from 'src/app/clases/active-user';
import { Viajes } from 'src/app/clases/viajes';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database: SQLiteObject;
  //tabla de usuarios (para routeguard)
  tbUsuario: string = "CREATE TABLE IF NOT EXISTS activeUser(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(80) NOT NULL, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, viajeId INTEGER NOT NULL);";
  listaUsuarios = new BehaviorSubject([]);
  
  //Tabla de viajes
  tbViajes: string = "CREATE TABLE IF NOT EXISTS viajesActivos(id INTEGER PRIMARY KEY autoincrement, Userid INTEGER NOT NULL, pasajeros INTEGER(1) NOT NULL, maxPasajeros INTEGER(1) NOT NULL, tarifa INTEGER(5) NOT NULL, destino VARCHAR(100) NOT NULL, patente VARCHAR(6) NOT NULL, informacion VARCHAR(240), estado INTEGER NOT NULL);";
  listaViajes = new BehaviorSubject([]);
  quant: number;
  
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite, 
    private platform:Platform, 
    public toastController: ToastController
  ) { 
      //this.presentToast("Componente cargado");
      this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;

        //llamo a crear las tablas
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  };

  async crearTablas() {
    try {
      //Crear la tabla de usuarios activos
      await this.database.executeSql(this.tbUsuario,[]);
      this.cargarUsuario();

      //Crear las tablas de los viajes activos
      await this.database.executeSql(this.tbViajes,[]);
      this.cargarViajes();


      this.isDbReady.next(true); 
    } catch (error) {
      //this.presentToast("Error en Crear Tabla: "+error);
    }
  };

  //SELECT * FROM activeUser
  cargarUsuario() {
    return this.database.executeSql('SELECT * FROM activeUser',[]).then(res=>{
      let items: ActiveUser[]=[];

      //Devolver al usuario con la id mas alta en la tabla, al fin y al cabo, solo deberia guardar 1 usuario
      if(res.rows.length>0){
        items.push({
          id: res.rows.item(res.rows.length-1).id,
          nombre: res.rows.item(res.rows.length-1).nombre,
          username: res.rows.item(res.rows.length-1).username,
          password: res.rows.item(res.rows.length-1).password,
          viajeId: res.rows.item(res.rows.length-1).viajeId
        });  
      }

      this.listaUsuarios.next(items);
    });
  };

  fetchUsuario(): Observable<ActiveUser[]> {
    return this.listaUsuarios.asObservable();
  };
  
  addUsuario(id,name,username,password){
    let data=[id,name,username,password,-1];//el -1 es el viaje que tenga activo, por defecto no tendra ninguno
    return this.database.executeSql('INSERT INTO activeUser(id,nombre, username,password,viajeId) VALUES(?,?,?,?,?)',data).then(()=>{
      this.cargarUsuario();
    });
  };

  //Actualiza si el usuario esta en algun viaje o no
  updateViajeUsuario(viajeId,id){
    let data=[viajeId,id];
    return this.database.executeSql('UPDATE activeUser SET viajeId=? WHERE id=?',data).then(()=>{
      this.cargarUsuario();
    });
  }

  updateUsuario(id,username,password){
    let data=[username,password,id];
    return this.database.executeSql('UPDATE activeUser SET username=?, password=? WHERE id=?',data).then(()=>{
      this.cargarUsuario();
    });
  };

  deleteAllUsuarios(){
    return this.database.executeSql('DELETE FROM activeUser').then(() =>{
     // this.presentToast("Usuarios eliminados");
    });
  };

  deleteUsuario(id){
    return this.database.executeSql('DELETE FROM activeUser WHERE id=?',[id]).then(()=>{
      this.cargarUsuario();
    });
  };




  /* Tabla de viajes que estan activos */
  cargarViajes(){
    return this.database.executeSql('SELECT * FROM viajesActivos',[]).then(res=>{
      let items: Viajes[]=[];

      //Devolver al usuario con la id mas alta en la tabla, al fin y al cabo, solo deberia guardar 1 usuario
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            Userid: res.rows.item(i).Userid,
            pasajeros: res.rows.item(i).pasajeros,
            maxPasajeros:res.rows.item(i).maxPasajeros,
            tarifa: res.rows.item(i).tarifa,
            destino: res.rows.item(i).destino,
            patente: res.rows.item(i).patente,
            informacion: res.rows.item(i).informacion,
            estado: res.rows.item(i).estado
          });          
        }
      }

      this.listaViajes.next(items);
    });
  }; 

  fetchViajes(): Observable<Viajes[]> {
    return this.listaViajes.asObservable();
  };

  addViaje(conductor, pasajeros, maxPasajeros,tarifa, destino, patente, informacion, estado){
    let data=[conductor, pasajeros,maxPasajeros,tarifa, destino, patente, informacion, estado];
    return this.database.executeSql('INSERT INTO viajesActivos(Userid, pasajeros, maxPasajeros, tarifa, destino, patente, informacion, estado) VALUES(?,?,?,?,?,?,?,?)',data).then(()=>{
      this.cargarViajes();
    });
  };

  checkViaje(id){
    return this.database.executeSql('SELECT * FROM viajesActivos WHERE id=?',[id]).then(res=>{
      return res.rows.length;
    });
  }

  //Suma o resta 1 mas a la cantidad de pasajeros
  updatePasajerosViaje(cant,id){
    let data=[cant,id];
    return this.database.executeSql('UPDATE viajesActivos SET pasajeros=? WHERE id=?',data).then(()=>{
      this.cargarViajes();
    });
  }

  updateEstadoViaje(est,id){
    let data=[est,id];
    return this.database.executeSql('UPDATE viajesActivos SET estado=? WHERE id=?',data).then(()=>{
      this.cargarViajes();
    });
  }

  deleteViaje(id){
    return this.database.executeSql('DELETE FROM viajesActivos WHERE id=?',[id]).then(()=>{
      this.cargarViajes();
    });
  };


  dbState(){
    return this.isDbReady.asObservable();
  };

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  };
}
