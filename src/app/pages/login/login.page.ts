import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//Splash screen
import { AnimationOptions } from 'ngx-lottie';

//Animaciones
import { AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
	@ViewChild('appLogo',{read: ElementRef, static:true}) logo: ElementRef;

	modalController: any;

	//Blur pero con variables por que no se como integrar blur aun
	bolShowUserError: boolean = false;
	bolShowPasswordError: boolean = false;

	user={
		usuario: "",
		password: ""
	}
	field: String = "";


	//Splash screen
	options: AnimationOptions = {
		path: '/assets/lottie/splash.json'
	  }
	bolShowSplash: boolean = true ;//Dejar al splash screen visible por defecto



	constructor(
		private router: Router,
		public toastController: ToastController,
		private animationCtrl: AnimationController
	) {}
	

	 validador(model: any){
		for (var [key, value] of Object.entries(model)) {
			if (value == ""){
				this.field = key;
				return false;
			}
		}
		return true;
	 };
	
	 InSesion(){

		/* validacion */
		if (this.validador(this.user)){
			let navigationExtras: NavigationExtras={
				state:{
					user: this.user
				}
			};
			this.router.navigate(['/home'], navigationExtras)
		}else{
			//this.presentToast("Error en "+this.field);
			this.bolShowUserError = true;
			this.bolShowPasswordError = true;
		}
	  };
	 
	  ngOnInit() {
		setTimeout(() => {
			this.bolShowSplash = false;


			//Animacion del logo solo despues del splash screen (girara 360 grado)
			const logoanimation = this.animationCtrl.create()
			.addElement( this.logo.nativeElement)
			.duration(2000)
			.keyframes([
				{ offset: 0, transform: 'scale(0.5) rotate(0deg)', opacity: 0},
				{ offset: 1, transform: 'scale(1) rotate(360deg)', opacity: 1 }
			  ])
			  logoanimation.play();//iniciar la animacion del logo

		  }, 2000);  //2s
		
	  };

	  async presentToast(msg:string) {
		const toast = await this.toastController.create({
		  message: msg,
		  duration: 3500
		});
		toast.present();
	  };

	  
	  
	
}

