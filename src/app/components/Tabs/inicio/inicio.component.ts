import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//importar BD SQlite
import { ActiveUser } from 'src/app/clases/active-user';
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  usuarios: ActiveUser[];

  constructor(
    private servicioBD: DbserviceService,
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarBDusuarios();
  }

  ionViewWillEnter(){
    this.cargarBDusuarios();
  }

  cargarBDusuarios(){
    //Cargar la base de datos
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchUsuario().subscribe(item=>{
          this.usuarios=item;
        })
      }
    });
  }

  Cerrar(){
    this.servicioBD.deleteAllUsuarios();
    localStorage.removeItem('ingresado')
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
