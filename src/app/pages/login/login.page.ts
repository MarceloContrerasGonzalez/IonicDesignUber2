import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiClientService } from 'src/app/services/api-client.service';

//Splash screen
import { AnimationOptions } from 'ngx-lottie';

//Animaciones
import { AnimationController } from '@ionic/angular';
import { Observable, Subscriber, Subscription } from 'rxjs'; //añadi el subject
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
	@ViewChild('appLogo',{read: ElementRef, static:true}) logo: ElementRef;

	//BDD
	alumno:any={
		id: null,
		nombre: "",
		username: "",
		password: ""
	};
	alumnos:any;
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
		private animationCtrl: AnimationController,
		private api: ApiClientService
	) {}
	
	ionViewWillEnter(){
		this.getUsuarios();
	}

	getUsuarios(){

		this.api.getUsuarios().subscribe((data)=>{
		  let jsonData =  Object.values(data) //recojer los datos del objeto del api y transformalos
		  let alumSchema = Object.values(jsonData[0]) //Tomar los datos del primer objeto, buscar dentro del esquema de id 0 (alumnos) y pasarlo a la variable 2 como objeto

		  this.alumnos = alumSchema;//le pasamos la variable 

		});
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
	
	 InSesion(){

		/* validacion */
		if (this.validador(this.user)){

			for (let i = 1; i < this.alumnos.length; i++){
				if (this.user.usuario == this.alumnos[i].username)
				{
					if (this.user.password == this.alumnos[i].password){
						console.log("VALIDADO EL USUARIO");
						this.router.navigate(['/home'])
					} else {
						console.log("Username o password incorrecta");
					}
					break;
				}
				
			}
			console.log("No habia nada")
		}else{
			//this.presentToast("Error en "+this.field);
			this.bolShowUserError = true;
			this.bolShowPasswordError =true;
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

