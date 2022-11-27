import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

//componente maps
import { MapsComponent } from '../../maps/maps.component';

//Firebase
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { ViajesI } from 'src/app/models/models';

//Dialog angular material
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';
//import { format } from 'path';

//Formatear hora
import { format, parseISO } from 'date-fns'

@Component({
  selector: 'app-conducir',
  templateUrl: './conducir.component.html',
  styleUrls: ['./conducir.component.scss'],
})
export class ConducirComponent implements OnInit {
  //Viajes firebases
  viajes: any[] = [];
  hora: string = '';

  idViaje;//si le pongo any me da error, si le pongo number no puedo hacerle un index en el scrip delete, mejor no ponerle nada
  menuDepth: Number = 0;
  ubicacion: any;
  usuarioID = localStorage.getItem('usuarioActivo');

  //validador
  field: String = "";


  //tripForm: FormGroup;
  form = {
    pasajero: "",//Cantidad de pasajeros maximos
    tarifa: "",
    destino: "",
    patente: "",
    informacion: ""
  }

  constructor(
    public toastController: ToastController,
    private firestore: FirestoreService,
    private modalController: ModalController,
    public dialog: MatDialog
  ) { }



  ngOnInit() {
    this.idViaje = 0;
    //Cargar la base de datos
    this.cargarViajes();
    localStorage.removeItem('preferenciaViaje')
    localStorage.setItem('preferenciaAuto', 'true')
  }

  ionViewWillEnter() {
    this.menuDepth = 0;
    this.idViaje = 0;

    //transformar la hora actual del sistema a un formato string
    let timeFromSystem = new Date();
    let valueToTransform = timeFromSystem.toLocaleTimeString();//timeFromSystem.toString();
    //let valueTransformed = format(parseISO(valueToTransform),'HH:mm');
    
    console.log("from system",valueToTransform.substring(0,4) )
    this.hora = valueToTransform.substring(0,4);
    //this.hora = format(parseISO(timeFromSystem),'HH:mm')

    //Actualizar la base de datos
    this.cargarViajes();
  }

  getTimePicker(value){
    let dateFromIonDateTime = value;
    this.hora = format(parseISO(dateFromIonDateTime),'HH:mm')
    console.log('hora transformada ',this.hora)
  }

  VehicleFormat(){
    this.form.patente = this.form.patente.replace(/-/gi,"");
    let formated = this.form.patente.slice(0, 2) + "-" + this.form.patente.slice(2, 4)  + "-" + this.form.patente.slice(4, 6);
    this.form.patente = formated;
    //console.log("formateado ",formated);
  }

  cargarViajes() {
    this.firestore.getCollections<ViajesI>('Viajes').subscribe(res => {
      this.viajes = res;
      console.log("viajes cargados", res)

      //Verificar si eres dueño de algun viaje
      if (this.idViaje == 0) {
        for (let i = 0; i < this.viajes.length; i++) {
          if (this.viajes[i].Userid == this.usuarioID) {
            this.idViaje = i;
            //si encuentra que eres dueño de un viaje, verificar su estado , dependiendo de eso se cambiara el ngSwitch
            if (this.viajes[i].estado == 0) {
              //si estas esperando pasajeros
              this.menuDepth = 1;
            } else {
              //si tienes el viaje activo
              this.menuDepth = 2;
            }
          }
        }
      }

    });
  };

  eliminarViaje() {
    this.firestore.deleteDoc('Viajes', this.viajes[this.idViaje].id)
    this.menuDepth = 0;
  }

  empezarViaje() {
    this.firestore.updateDoc({ estado: 1 }, 'Viajes', this.viajes[this.idViaje].id);
    this.menuDepth = 2;
  }

  crearViaje() {
    const data: ViajesI = {
      Userid: this.usuarioID,
      pasajeros: 0,
      maxPasajeros: parseInt(this.form.pasajero),
      tarifa: parseInt(this.form.tarifa),
      hora: this.hora,
      destino: this.form.destino,
      patente: this.form.patente,
      informacion: this.form.informacion,
      estado: 0
    }
    this.firestore.createRandomDoc(data, 'Viajes');
  }



  formSubmit() {
    if (this.validadorForm(this.form)) {
      this.crearViaje();
      this.cargarViajes();
      this.menuDepth = 1;
    }

  }

  validadorForm(model: any) {
    for (var [key, value] of Object.entries(model)) {
      switch (key) {
        case 'pasajero': {
          if ((value <= 0) || (value > 6)) {
            this.callDialog("La cantidad de pasajeros debe ser entre 1 y 6");
            return false;
          }
        }

        

        case 'tarifa':{
          if (value <= 0){
            this.callDialog("La tarifa debe valer entre $1 a $3500");
            return false;
          } else if (value > 3500){
            this.callDialog("La tarifa no puede superar los $3500 por persona");
            return false;
          }
        }

        case 'patente':{
          if (this.form.patente.length <8){
            this.callDialog("Debes establecer una patente para el vehiculo");
            return false;
          }
        }

        default: {
          if ((key != 'informacion') && (value == "")) {
            this.callDialog("La casilla de " + key + " no debe estar vacia");
            return false;
          }
        }

      }
    }
    return true;
  };

  async addDirection() {
    const modalAdd = await this.modalController.create({
      component: MapsComponent,
      mode: 'ios',
      swipeToClose: false
    });
    await modalAdd.present();

    const { data } = await modalAdd.onWillDismiss();
    if (data) {
      this.form.destino = data.pos;
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  };

  callDialog(msg: string) {
    //Llamar al componente dialogo
    this.dialog.open(DialogComponent, {
      data: msg
    });
  }




}
