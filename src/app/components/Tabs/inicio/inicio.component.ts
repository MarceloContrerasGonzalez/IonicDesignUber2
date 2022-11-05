import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private router: Router
  ) {}

  ngOnInit() {
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
