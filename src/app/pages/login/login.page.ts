import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//Dialog
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

import { ApiClientService } from 'src/app/services/Api/api-client.service';

//importar BDD storage
//import { StorageServiceService } from 'src/app/services/Storage/storage-service.service';
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';

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

	//Api conexion github
	alumnos:any;

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
		private api: ApiClientService,
		private dbservice: DbserviceService,
		public dialog: MatDialog
	) {}
	
	ionViewWillEnter(){
		//rescartar a los usuarios de la api para manejarlos y validarlos al iniciar sesion
		this.getUsuarios();
	}

	getUsuarios(){
		this.api.getUsuarios().subscribe((data)=>{
		  let jsonData =  Object.values(data) //recojer los datos del objeto del api y transformalos
		  let alumSchema = Object.values(jsonData[0]) //Tomar los datos del primer objeto, buscar dentro del esquema de id 0 (alumnos) y pasarlo a la variable 2 como objeto

		  this.alumnos = alumSchema;//le pasamos la variable 
		});
	};
	
	guardarBDD() {
		this.dbservice.addUsuario(this.user.usuario,this.user.password);
		//this.dbservice.presentToast("Usuario guardado");
	}


	 //Validar que los campos no esten vacios
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
		let bolError = false;
		/* validacion */
		if (this.validador(this.user)){

			 for (let i = 1; i < this.alumnos.length; i++){
				if ((this.user.usuario == this.alumnos[i].username) && (this.user.password == this.alumnos[i].password))
				{
					console.log("VALIDADO EL USUARIO");
					this.guardarBDD();
					localStorage.setItem('ingresado','true')
					this.router.navigate(['/home'])
					break;
				} 

				if (i >= this.alumnos.length-1){
					bolError = true;
				}
			}

			if (bolError == true){
				this.dataUserError("El usuario y/o la contraseña son incorrectos");
			}
		}else{
			//this.presentToast("Error en "+this.field);
			this.bolShowUserError = true;
			this.bolShowPasswordError =true;
		}
	};

	dataUserError(msg){
		const dialogRef = this.dialog.open(DialogComponent, {
			data: msg
		  });
		//console.log("Username o password incorrecta");

		//this.presentToast("algo malo")
	}
	 
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

