import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//importar BD SQlite
<<<<<<< HEAD
//import { ActiveUser } from 'src/app/clases/active-user';
//import { DbserviceService } from 'src/app/services/SQL/dbservice.service';


//Firebase
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { usuariosI } from 'src/app/models/models';

=======
import { ActiveUser } from 'src/app/clases/active-user';
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';


>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
<<<<<<< HEAD
  usuario = {
    nombre: "",
    username: "",
    password: ""
  };
  usuarioID = localStorage.getItem('usuarioActivo');

  constructor(
    //private servicioBD: DbserviceService,
    private firestore: FirestoreService,
=======
  usuarios: ActiveUser[];

  constructor(
    private servicioBD: DbserviceService,
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
<<<<<<< HEAD
    this.usuarioID = localStorage.getItem('usuarioActivo');
    this.cargarUsuario();
  }

  ionViewWillEnter(){
    this.usuarioID = localStorage.getItem('usuarioActivo');
    this.cargarUsuario();
    
  }

  cargarUsuario(){
    this.firestore.getDocument<usuariosI>('Usuarios',this.usuarioID).subscribe(res=>{
      this.usuario = res;
      console.log("usuario cargardo",res)
    });
    //Cargar la base de datos
    /*this.servicioBD.dbState().subscribe((res)=>{
=======
    this.cargarBDusuarios();
  }

  ionViewWillEnter(){
    this.cargarBDusuarios();
  }

  cargarBDusuarios(){
    //Cargar la base de datos
    this.servicioBD.dbState().subscribe((res)=>{
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
      if(res){
        this.servicioBD.fetchUsuario().subscribe(item=>{
          this.usuarios=item;
        })
      }
    });
<<<<<<< HEAD
    */
  }

  Cerrar(){
    //this.servicioBD.deleteAllUsuarios();
    localStorage.removeItem('ingresado')
    localStorage.removeItem('usuarioActivo')
=======
  }

  Cerrar(){
    this.servicioBD.deleteAllUsuarios();
    localStorage.removeItem('ingresado')
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
    this.router.navigate(['/login']);
  };  


  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3500
    });
    toast.present();
    };

}
