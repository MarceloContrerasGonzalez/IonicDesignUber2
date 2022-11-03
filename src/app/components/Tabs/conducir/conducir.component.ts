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
<<<<<<< HEAD
  usuarioID = parseInt(localStorage.getItem('usuarioActivo'));
=======
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3

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

  

  ngOnInit() {
    this.idViaje = 0;
    //Cargar la base de datos
    this.cargarBdd();
    this.checkIDviaje();
  }

  ionViewWillEnter(){
    this.menuDepth = 0;
    this.idViaje = 0;

    console.log("//////////////////////////////////////////////")
    console.log("ionwillenter: idviaje" + this.idViaje)

    //Actualizar la base de datos
    this.cargarBdd();
    this.checkIDviaje();
  }

  cargarBdd(){
    this.servicioBD.dbState().subscribe((res) => {
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
  }

  checkIDviaje(){
     //Recorrer la base de datos para detectar si eres conductor de un viaje
     for (let i = 0; i < this.viajes.length; i++){
<<<<<<< HEAD
      if (this.viajes[i].Userid == this.conductor[this.usuarioID].id){
=======
      if (this.viajes[i].Userid == this.conductor[0].id){
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3

        //this.presentToast(this.viajes[i].Userid + " / " + this.conductor[0].id)

        this.idViaje = i;
        console.log("///////////////////////////////////")
        console.log("nuevo id viaje: " + this.idViaje)

        //si encuentra que eres dueño de un viaje, verificar su estado , dependiendo de eso se cambiara el ngSwitch
        if(this.viajes[i].estado == 0){
            //si estas esperando pasajeros
            this.menuDepth = 1;
        } else {
          //si tienes el viaje activo
          this.menuDepth = 2;
        }
        break;//solo deberias tener un viaje activo a la vez, por eso el break, empezando por el mas antiguo
      } else {
<<<<<<< HEAD
        console.log("El viaje de id " + i + "no coincidio con la del conductor " + this.conductor[this.usuarioID].id)
=======
        console.log("El viaje de id " + i + "no coincidio con la del conductor " + this.conductor[0].id)
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
      }
    }
  }

  updateCheck(){
     //Actualizar la id del viaje con el que creaste
     for (let i = 0; i < this.viajes.length; i++){
<<<<<<< HEAD
      if (this.viajes[i].Userid == this.conductor[this.usuarioID].id){
=======
      if (this.viajes[i].Userid == this.conductor[0].id){
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
        this.idViaje = i;
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
<<<<<<< HEAD
    let userID = this.conductor[this.usuarioID].id;
=======
    let userID = this.conductor[0].id;
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
    //this.presentToast(userID + "");
    //El viaje empezara con 0 pasajeros a bordo y en el estado 0 de viaje
    this.servicioBD.addViaje(userID, 0 ,this.form.pasajero,this.form.tarifa,this.form.destino,this.form.patente,this.form.informacion, 0);
  }

  

  formSubmit(){
    if (this.validadorForm(this.form)){
      this.crearViaje();

      //Actualizar los viajes
      this.servicioBD.fetchViajes().subscribe(item => {
        this.viajes = item;
        this.updateCheck();
        this.menuDepth = 1;
      });
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
