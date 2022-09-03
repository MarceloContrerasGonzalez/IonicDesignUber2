import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


//Splash screen
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
	modalController: any;

	//Blur pero con variables por que no se como integrar blur aun
	bolShowUserError: boolean = false;
	bolShowPasswordError: boolean = false;

	user={
		usuario: "",
		password: ""
	}
	field: String = "";

	

	//Llamar al splash screen
	options: AnimationOptions = {
		path: '/assets/lottie/splash.json'
	  }
	bolShowSplash: boolean = false ;//Dejar al splash screen visible por defecto

	
	
	  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }


	constructor(
		private router: Router,
		public toastController: ToastController
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

