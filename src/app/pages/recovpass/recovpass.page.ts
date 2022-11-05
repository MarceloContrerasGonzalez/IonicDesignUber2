import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//Dialog angular material
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';
@Component({
  selector: 'app-recovpass',
  templateUrl: './recovpass.page.html',
  styleUrls: ['./recovpass.page.scss'],
})
export class RecovpassPage implements OnInit {
  nombre_user:string="";
  //validacion blur manual
  bolShowUserError: boolean = false;

  constructor(
    public toastController: ToastController,
    private router: Router,
    public dialog: MatDialog
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

      //Llamar al componente dialogo
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
}
