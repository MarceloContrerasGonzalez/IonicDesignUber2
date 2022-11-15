import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

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
    private firestore: FirestoreService,
    public toastController: ToastController,
    public navControl: NavController
  ) {}


  ngOnInit() {
    this.usuarioID = localStorage.getItem('usuarioActivo');
    console.log("id usuario cargado ng",this.usuarioID)
    this.cargarUsuario();
    localStorage.removeItem('preferenciaAuto')
    localStorage.removeItem('preferenciaViaje')
  }

  ionViewWillEnter(){
    this.usuarioID = localStorage.getItem('usuarioActivo');
    console.log("id usuario cargado will",this.usuarioID)
    this.cargarUsuario();
    
  }

  cargarUsuario(){
    this.firestore.getDocument<usuariosI>('Usuarios',this.usuarioID).subscribe(res=>{
      this.usuario = res;
      console.log("usuario cargardo",res)
    });
  }

  Cerrar(){
    localStorage.removeItem('ingresado')
    localStorage.removeItem('usuarioActivo')
    this.navControl.navigateRoot(['/login']);//Con navControl, se elimina de la memoria las pag anteriores
  };  


  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3500
    });
    toast.present();
    };

}
