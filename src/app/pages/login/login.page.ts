import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

<<<<<<< HEAD

//Clases
import { ActiveUser } from 'src/app/clases/active-user';

=======
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
//Dialog
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

import { ApiClientService } from 'src/app/services/Api/api-client.service';

//importar BDD storage
//import { StorageServiceService } from 'src/app/services/Storage/storage-service.service';
<<<<<<< HEAD
//import { DbserviceService } from 'src/app/services/SQL/dbservice.service';
=======
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3

//Splash screen
import { AnimationOptions } from 'ngx-lottie';

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

<<<<<<< HEAD
=======
	//Api conexion github
	alumnos:any;
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3

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
<<<<<<< HEAD
		//private dbservice: DbserviceService,
		public dialog: MatDialog,
		private firestore: FirestoreService
	) {}
	
	ionViewWillEnter(){
		
		//rescartar a los usuarios del sqlite
		/*this.dbservice.dbState().subscribe((res)=>{
			if(res){
			  this.dbservice.fetchUsuario().subscribe(user => {
				this.usuarios = user;
			  });
			}
		  });*/

		//this.getEstudiantes();
		
	}

	async getUsuariosApi(){
=======
		private dbservice: DbserviceService,
		public dialog: MatDialog
	) {}
	
	ionViewWillEnter(){
		//rescartar a los usuarios de la api para manejarlos y validarlos al iniciar sesion
		this.getUsuarios();
	}

	getUsuarios(){
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
		this.api.getUsuarios().subscribe((data)=>{
		  let jsonData =  Object.values(data) //recojer los datos del objeto del api y transformalos
		  let alumSchema = Object.values(jsonData[0]) //Tomar los datos del primer objeto, buscar dentro del esquema de id 0 (alumnos) y pasarlo a la variable 2 como objeto

		  this.alumnos = alumSchema;//le pasamos la variable 
<<<<<<< HEAD


		  //Hacer un bucle for con todos los alumnos recogidos y pasarlos a firebase
		  for (let i = 0; i < this.alumnos.length; i++){
				console.log("Bucle for")
				//this.dbservice.addUsuario(this.alumnos[i].id, this.alumnos[i].nombre, this.alumnos[i].username, this.alumnos[i].password);
				//this.firestore.createDoc()
				this.crearUsuarios(this.alumnos[i].nombre,this.alumnos[i].username,this.alumnos[i].password,(i+1).toString())
		  }
=======
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
		});
	};

	//Crea al usuario y lo guarda en la base de datos
<<<<<<< HEAD
	/*guardarBDD(id, name, user, pass) {
		this.dbservice.addUsuario(id, name,user,pass);
		//this.dbservice.presentToast("Usuario guardado");
	}
	*/
=======
	guardarBDD(id, name, user, pass) {
		this.dbservice.addUsuario(id, name,user,pass);
		//this.dbservice.presentToast("Usuario guardado");
	}

>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3

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
<<<<<<< HEAD
		
		let bolError = false;
		// validacion 
		if (this.validador(this.user)){

			 for (let i = 0; i < this.usuarios.length; i++){
				if ((this.user.usuario == this.usuarios[i].username) && (this.user.password == this.usuarios[i].password))
				{
					console.log("VALIDADO EL USUARIO");
					//this.guardarBDD(this.alumnos[i].id, this.alumnos[i].nombre,this.user.usuario,this.user.password);
					localStorage.setItem('usuarioActivo',this.usuarios[i].id)
=======
		let bolError = false;
		/* validacion */
		if (this.validador(this.user)){

			 for (let i = 1; i < this.alumnos.length; i++){
				if ((this.user.usuario == this.alumnos[i].username) && (this.user.password == this.alumnos[i].password))
				{
					console.log("VALIDADO EL USUARIO");
					this.guardarBDD(this.alumnos[i].id, this.alumnos[i].nombre,this.user.usuario,this.user.password);
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
					localStorage.setItem('ingresado','true')
					this.router.navigate(['/home'])
					break;
				} 

<<<<<<< HEAD
				if (i >= this.usuarios.length-1){
=======
				if (i >= this.alumnos.length-1){
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
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
<<<<<<< HEAD
		
=======
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
	};

	dataUserError(msg){
		const dialogRef = this.dialog.open(DialogComponent, {
			data: msg
		  });
<<<<<<< HEAD
	}

	  ngOnInit() {
		//verificar si la base de datos esta vacia para pasarle los datos de la api GITHUB
		this.cargarUsuarios();

=======
		//console.log("Username o password incorrecta");

		//this.presentToast("algo malo")
	}
	 
	  ngOnInit() {
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
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

	  crearUsuarios(name: string, username:string, password:string, id:string){
		const usuarios: usuariosI ={
			nombre: name,
			username: username,
			password: password,
			viajeID: 'null'
		}
		this.firestore.createDoc(usuarios,'Usuarios',id)
	  };

	  actualizarUsuario(){
		const update ={
			nombre: 'update2',
			username: 'update@duoc3'
		}
		this.firestore.updateDoc(update,'Usuarios','1');
	  }

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
				//console.log("res",res)
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

