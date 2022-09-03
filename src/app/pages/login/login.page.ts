import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
	user ={
		usuario: "",
		password: ""
	}


	field: String = "";
	constructor(
		private router: Router,
		public toastController: ToastController
		) {}

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
			this.presentToast("Error En el campo: "+this.field);
		}

	  };
	
	  
	 validador(model: any){
		for (var [key, value] of Object.entries(model)) {
			if (value == ""){
				this.field = key;
				return false;
			}
		}
		return true;
	 };
	 
	 
	  ngOnInit() {
	  };

	  async presentToast(msg:string) {
		const toast = await this.toastController.create({
		  message: msg,
		  duration: 3500
		});
		toast.present();
	  };
	
}