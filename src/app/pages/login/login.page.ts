import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//Dialog
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

import { ApiClientService } from 'src/app/services/Api/api-client.service';

//Splash screen
/* import { AnimationOptions } from 'ngx-lottie'; */

//Animaciones
import { AnimationController } from '@ionic/angular';

//Firestore DB
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { usuariosI } from 'src/app/models/models';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
	@ViewChild('appLogo',{read: ElementRef, static:true}) logo: ElementRef;
	userCollectionLenght = -1;

	//Api conexion github
	alumnos:any;

	//usuarios de firebase
	usuarios: any[]=[]; //deberia ser el formato de la interfaz, pero debido a que tambien tomo su id para guardarlo en localstorage, no es posible


	//Blur pero con variables por que no se como integrar blur aun
	bolShowUserError: boolean = false;
	bolShowPasswordError: boolean = false;

	user={
		usuario: "",
		password: ""
	}
	field: String = "";


	//Splash screen
	/* options: AnimationOptions = {
		path: '/assets/lottie/splash.json'
	  }
	bolShowSplash: boolean = true ;//Dejar al splash screen visible por defecto
 */
	constructor(
		private router: Router,
		public toastController: ToastController,
		private animationCtrl: AnimationController,
		private api: ApiClientService,
		public dialog: MatDialog,
		private firestore: FirestoreService
	) {}
	
	ionViewWillEnter(){}

	async getUsuariosApi(){
		this.api.getUsuarios().subscribe((data)=>{
		  let jsonData =  Object.values(data) //recojer los datos del objeto del api y transformalos
		  let alumSchema = Object.values(jsonData[0]) //Tomar los datos del primer objeto, buscar dentro del esquema de id 0 (alumnos) y pasarlo a la variable 2 como objeto

		  this.alumnos = alumSchema;//le pasamos la variable 


		  //Hacer un bucle for con todos los alumnos recogidos y pasarlos a firebase
		  for (let i = 0; i < this.alumnos.length; i++){
				console.log("Bucle for")
				this.crearUsuarios(this.alumnos[i].nombre,this.alumnos[i].username,this.alumnos[i].password,(i+1).toString())
		  }
		});
	};

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
		// validacion 
		if (this.validador(this.user)){

			 for (let i = 0; i < this.usuarios.length; i++){
				if ((this.user.usuario == this.usuarios[i].username) && (this.user.password == this.usuarios[i].password))
				{
					console.log("VALIDADO EL USUARIO");
					localStorage.setItem('usuarioActivo',this.usuarios[i].id)
					localStorage.setItem('ingresado','true')
					this.router.navigate(['/home'])
					break;
				} 

				if (i >= this.usuarios.length-1){
					bolError = true;
				}
			}

			if (bolError == true){
				this.dataUserError("El usuario y/o la contraseña son incorrectos");
			}
		}else{
			this.bolShowUserError = true;
			this.bolShowPasswordError =true;
		}
		
	};

	dataUserError(msg){
		const dialogRef = this.dialog.open(DialogComponent, {
			data: msg
		  });
	}

	  ngOnInit() {
		//verificar si la base de datos esta vacia para pasarle los datos de la api GITHUB
		this.cargarUsuarios();

		setTimeout(() => {
			/* this.bolShowSplash = false; */
			

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

	  crearUsuarios(name: string, username:string, password:string, id:string){
		const usuarios: usuariosI ={
			nombre: name,
			username: username,
			password: password,
			viajeID: 'null'
		}
		this.firestore.createDoc(usuarios,'Usuarios',id)
	  };

	  getUsuarios(){
		this.firestore.getCollections('Usuarios').subscribe( res => {
			console.log("contenido: ",res)
		});
	  };

	  async cargarUsuarios(){
		this.firestore.getCollections<usuariosI>('Usuarios').subscribe(res=>{
			console.log('largo script: ', res.length );

			//Si el largo de la coleccion es 0 (osea, que no hay datos en firebase), cargarlos desde la api
			if (res.length == 0){
				this.getUsuariosApi();
			} else {
				//Cargarlos directamente en la memoria local
				this.usuarios = res;
				console.log("usuarios",this.usuarios)
			}
			//return res.length;
		});
	  };

	  async presentToast(msg:string) {
		const toast = await this.toastController.create({
		  message: msg,
		  duration: 3500
		});
		toast.present();
	  };
}

