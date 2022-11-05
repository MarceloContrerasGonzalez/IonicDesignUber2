import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

//importar BD SQlite
//import { ActiveUser } from 'src/app/clases/active-user';
//import { DbserviceService } from 'src/app/services/SQL/dbservice.service';


 //Firebase
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { usuariosI } from 'src/app/models/models';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  usuario = {
    nombre: "",
    username: "",
    password: ""
  };
  usuarioID = localStorage.getItem('usuarioActivo');

  constructor(
    //private servicioBD: DbserviceService,
    private firestore: FirestoreService,
    public toastController: ToastController,
    //private router: Router,
    public navControl: NavController
  ) {}

  ngOnInit() {
    this.usuarioID = localStorage.getItem('usuarioActivo');
    console.log("id usuario cargado ng",this.usuarioID)
    this.cargarUsuario();
  }

  ionViewWillEnter(){
    this.usuarioID = localStorage.getItem('usuarioActivo');
    console.log("id usuario cargado will",this.usuarioID)
    this.cargarUsuario();
    
  }

  ionViewDidEnter(){
    console.log("awuebo did")
  }

  cargarUsuario(){
    this.firestore.getDocument<usuariosI>('Usuarios',this.usuarioID).subscribe(res=>{
      this.usuario = res;
      console.log("usuario cargardo",res)
    });
    //Cargar la base de datos
    /*this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchUsuario().subscribe(item=>{
          this.usuarios=item;
        })
      }
    });
    */
  }

  Cerrar(){
    //this.servicioBD.deleteAllUsuarios();
    localStorage.removeItem('ingresado')
    localStorage.removeItem('usuarioActivo')
   //this.router.navigate(['/login']);
    this.navControl.navigateRoot(['/login']);
    //this.router.navigate(["login"], { replaceUrl: true });
  };  


  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3500
    });
    toast.present();
    };

}
