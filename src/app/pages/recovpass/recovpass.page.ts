import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recovpass',
  templateUrl: './recovpass.page.html',
  styleUrls: ['./recovpass.page.scss'],
})
export class RecovpassPage implements OnInit {
  nombre_user:string="";

  constructor(
    public toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  Recovery(){
    if (this.validateUser(this.nombre_user)){
      this.presentToast("Se a enviado un correo al correo asociado de :" + this.nombre_user)

      //cambiar de pagina, pasar el parametro de state
      this.router.navigate(['/login'])
    }
    
  }

  validateUser(value){
    //Aqui se validaria que el usuario exista en la base de datos... a futuro
    if(value == "" ){
      return false;
    }
      
      return true;
    }
}
