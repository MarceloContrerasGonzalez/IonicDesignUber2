import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
/*
export class HomePage {
  dato:string;
  constructor(
    public toastController: ToastController, 
    private router: Router
  ) {}

  saludar(){
    // Llamar al toast para "crear una notificacion" 
    this.presentToast("nombre de sex = " + this.dato)
  }

  siguiente(){
    //state para pasar parametros a la otra pagina
    let navigationExtras: NavigationExtras={
      state: {dato: this.dato}
    }
    //cambiar de pagina, pasar el parametro de state
    this.router.navigate(['/login'], navigationExtras)
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
*/

export class HomePage {
  dato:any;
  nombre_user:string;
  apellido_user:string;
  educacion_user:string;
  fecha_user:Date;
  
  constructor(
    public toastController: ToastController, 
    private activeroute: ActivatedRoute, 
    private router: Router) 

    {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dato = this.router.getCurrentNavigation().extras.state.dato;
        console.log(this.dato)
      }
    });
  }

  informacion(){
    // Llamar al toast para "crear una notificacion" 
    this.presentToast("Su nombre es :" + this.nombre_user + " " + this.apellido_user)
  }

  reset_input(){
    this.nombre_user = "";
    this.apellido_user = "";
    this.educacion_user = null;
    this.fecha_user = null;
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  
    ngOnInit() {
    }
  
}
