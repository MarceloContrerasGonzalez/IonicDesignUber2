import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//Dialog angular material
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

//Firestore DB
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { usuariosI } from 'src/app/models/models';

//email composer
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
@Component({
  selector: 'app-recovpass',
  templateUrl: './recovpass.page.html',
  styleUrls: ['./recovpass.page.scss'],
})
export class RecovpassPage implements OnInit {
  nombre_user:string="";
  usuarios: usuariosI[]=[];


  //validacion blur manual
  bolShowUserError: boolean = false;

  constructor(
    public toastController: ToastController,
    private router: Router,
    public dialog: MatDialog,
    private firestore: FirestoreService,
    private emailComposer: EmailComposer
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios(){
		this.firestore.getCollections<usuariosI>('Usuarios').subscribe(res=>{
			//Si el largo de la coleccion es 0 (osea, que no hay datos en firebase), cargarlos desde la api
				//Cargarlos directamente en la memoria local
				this.usuarios = res;
				console.log("usuarios",this.usuarios)
		});
	};

  

  Recovery(){  
    let bolError = false;
    if (this.validateUser(this.nombre_user)){

      for (let i = 0; i < this.usuarios.length; i++){
				if ((this.nombre_user == this.usuarios[i].username))
				{
          this.openEmail();

          const dialogRef = this.dialog.open(DialogComponent, {
            data: 'Se a enviado un codigo al correo asociado de "' + this.nombre_user + '"'
          });
    
          //Cuando el componente dialogo se cierre...
          dialogRef.afterClosed().subscribe(res => {
            console.log(res);
      
              if (res){
                //console.log('Borrar fichero')
                this.router.navigate(['/login'])
              }
          })
					break;
				} 

				if (i >= this.usuarios.length-1){
					bolError = true;
				}
			}

      if (bolError == true){
				//Llamar al componente dialogo
        const dialogRef = this.dialog.open(DialogComponent, {
          data: 'No se a contrado ningun que coincida con "' + this.nombre_user + '"'
        });
			}



    } else {
      this.bolShowUserError = true;
    }
    

  }

  Cancel(){
    //Cancelar todo y volver al login
    this.router.navigate(['/login'])
  }

  validateUser(value){
    //Aqui se validaria que el usuario exista en la base de datos... a futuro
    if(value == "" ){
      return false;
    }
      
      return true;
  }

  async openEmail(){
    const email: EmailComposerOptions = {
      to: this.nombre_user+'@duocuc.cl',
      //this.viajes[this.idViaje].Userid
      cc: this.nombre_user+'@duocuc.cl',
      
      subject: 'Recuperar contraseña',
      body: 'Link para recuperar contraseña',
    };

    await this.emailComposer.open(email);
    
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
