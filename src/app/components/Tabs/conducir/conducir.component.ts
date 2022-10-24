import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

//componente maps
import { MapsComponent } from '../../maps/maps.component';

//importar BD SQlite
import { ActiveUser } from 'src/app/clases/active-user';
import { Viajes } from 'src/app/clases/viajes';
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';

//Dialog angular material
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

@Component({
  selector: 'app-conducir',
  templateUrl: './conducir.component.html',
  styleUrls: ['./conducir.component.scss'],
})
export class ConducirComponent implements OnInit {
  viajes: Viajes[];
  idViaje;//si le pongo any me da error, si le pongo number no puedo hacerle un index en el scrip delete, mejor no ponerle nada
  conductor: ActiveUser[];
  menuDepth: Number = 0;
  ubicacion: any;

  //validador
  field: String = "";
  

  //tripForm: FormGroup;
  form={
		pasajero: 0,//Cantidad de pasajeros maximos
		tarifa: 0,
    destino: "",
    patente: "",
    informacion: ""
	}

  constructor(
    public toastController: ToastController,
    private servicioBD: DbserviceService,
    private modalController: ModalController,
    public dialog: MatDialog
  ) { }

  

  async ngOnInit() {
    //Cargar la base de datos
    await this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        //viajes activos
        this.servicioBD.fetchViajes().subscribe(item => {
          this.viajes = item;
        });

        //usuario activo actual
        this.servicioBD.fetchUsuario().subscribe(user => {
          this.conductor = user;
        });
      }
    });
    this.idViaje = 0;
    this.checkIDviaje();
  }

  checkIDviaje(){
     //Recorrer la base de datos para detectar si eres conductor de un viaje
     for (let i = 0; i < this.viajes.length; i++){
      if (this.viajes[i].Userid == this.conductor[0].id){
        this.idViaje = i;

        //si encuentra que eres dueño de un viaje, verificar su estado , dependiendo de eso se cambiara el ngSwitch
        if(this.viajes[i].estado == 0){
            //si estas esperando pasajeros
            this.menuDepth = 1;
        } else {
          //si tienes el viaje activo
          this.menuDepth = 2;
        }
        break;//solo deberias tener un viaje activo a la vez, por eso el break, empezando por el mas antiguo
      }
      
    }
  }

  eliminarViaje(){
    this.servicioBD.deleteViaje(this.viajes[this.idViaje].id);
    this.menuDepth = 0;
  }

  empezarViaje(){
    this.servicioBD.updateEstadoViaje(1,this.viajes[this.idViaje].id);//el 1 es el estado de que el viaje ya empezo, evitara que mas clientes reserven
    this.menuDepth = 2;
  }

  crearViaje(){
    let userID = this.conductor[0].id;
    //El viaje empezara con 0 pasajeros a bordo y en el estado 0 de viaje
    this.servicioBD.addViaje(userID, 0 ,this.form.pasajero,this.form.tarifa,this.form.destino,this.form.patente,this.form.informacion, 0);
  }

  formSubmit(){
    if (this.validadorForm(this.form)){
      this.crearViaje();
      this.checkIDviaje();
      this.menuDepth = 1;
    }
    
  }

  validadorForm(model: any){
		for (var [key, value] of Object.entries(model)) {
      switch(key){
        case 'pasajero':{
          if ((value <= 0) || (value > 6)){
            this.callDialog("La cantidad de pasajeros debe ser mayor a 0 y menor a 6");
            return false;
          }
        }

        case 'tarifa':{
          if (value <= 0){
            this.callDialog("La tarifa debe ser un numero en positivo");
            return false;
          }
        }

        default:{
          if ((key != 'informacion') && (value == "")){
            this.callDialog("La casilla de " + key + " no debe estar vacia");
            return false;
          }
        }
       
      }
		}
		return true;
	 }; 

  async addDirection(){
    const modalAdd = await this.modalController.create({
      component: MapsComponent,
      mode: 'ios',
      swipeToClose: false
    });
    await modalAdd.present(); 

    const {data} = await modalAdd.onWillDismiss();
    if (data){
       this.form.destino = data.pos;
    }
  }

  async presentToast(msg:string) {
		const toast = await this.toastController.create({
		  message: msg,
		  duration: 3500
		});
		toast.present();
	  };

    callDialog(msg: string){
      //Llamar al componente dialogo
      this.dialog.open(DialogComponent, {
        data: msg
      });
    }


    
  
}
