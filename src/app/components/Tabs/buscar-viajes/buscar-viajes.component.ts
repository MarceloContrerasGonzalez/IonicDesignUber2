import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
/* import { ApiClientService } from 'src/app/services/Api/api-client.service'; */

//importar BD SQlite
import { Viajes } from 'src/app/clases/viajes';
import { ActiveUser } from 'src/app/clases/active-user';
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';

//Dialog angular material
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

//Firebase
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { usuariosI, ViajesI } from 'src/app/models/models';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.component.html',
  styleUrls: ['./buscar-viajes.component.scss'],
})
export class BuscarViajesComponent implements OnInit {
  //viajes: Viajes[];
  viajes: any[]=[];
  usuario: usuariosI;
 
  idViaje;//id del viaje dentro del array de datos locales
  menuDepth: Number = 0;
  usuarioID = localStorage.getItem('usuarioActivo');
  
  
  
  constructor(
    public toastController: ToastController,
    private firestore: FirestoreService,
    public dialog: MatDialog
  ){}

  async ngOnInit() {
     //Cargar la base de datos con los viajes
    this.cargarBdd();
    localStorage.removeItem('preferenciaAuto')
    localStorage.setItem('preferenciaViaje','true')  
  }

  async ionViewWillEnter(){
    //Actualizar la base de datos
    this.cargarBdd();
    this.verificarViajeUsuario();
  }

  cargarViajes(){
    this.firestore.getCollections<ViajesI>('Viajes').subscribe(res=>{
      this.viajes = res;
      console.log("viajes cargados",res)
      
      //Si ya hay un usuario cargado, verificar si ese usuario tenia un viaje reservado para tomar la id del array
      if (this.usuario){
        for (let i = 0; i < this.viajes.length; i++){
          if (this.viajes[i].id == this.usuario.viajeID){
            this.idViaje = i;
            break;
          }
        }
      }

    });
  };

  async cargarBdd(){
    this.cargarUsuario();
    this.cargarViajes();
  }

  cargarUsuario(){
    this.firestore.getDocument<usuariosI>('Usuarios',this.usuarioID).subscribe(res=>{
      this.usuario = res;
      console.log("usuario Cargado ",this.usuario)
    });
  }

  async verificarViajeUsuario(){
    this.firestore.getDocument<usuariosI>('Usuarios',this.usuarioID).subscribe(res=>{
      if (res.viajeID != 'null'){
        console.log("el usuario tenia algo")
          this.verificarViaje(res.viajeID).then(res=>{
            console.log("res dentro de verificar",res);
            let bol = res;

            if (!bol){
              console.log("el viaje ya no existe")
              this.callDialog("Este viaje ya no esta disponible");
              this.firestore.updateDoc({viajeID: 'null'},'Usuarios',this.usuarioID);
              this.menuDepth = 0;
            } else {
              console.log("el usuario si tenia un viaje reservado")
              this.menuDepth = 2;
            }
        })

        

      } else {
        console.log("el usuario tenia un null")
        this.menuDepth = 0;
      }
    });
  }


   //Verifica que el viaje que se tenga guardado exista
   verificarViaje(id){
    return this.firestore.checkDocumentExists('Viajes',id).then(res =>{
      console.log("res: ",res);
      return res;
    })

  };

  
  async elegirViaje(id){
    let bol = await this.verificarViaje(id);
      //console.log("q: ",q);

    if (bol){
      //transformar la id de la BD por la del array local
      for (let i = 0; i < this.viajes.length; i++){
        if (this.viajes[i].id == id){
          this.idViaje = i;
        }
      }
      console.log("id viaje",this.idViaje)
      this.menuDepth = 1;
    } else {//Si el viaje que vas a reservar ya no existe
      this.callDialog("Este viaje ya no esta disponible");
      this.menuDepth = 0;
    }
  }


  async reservarViaje(){
    //Primero verificar que ese viaje siga existiendo
    let bol = await this.verificarViaje(this.viajes[this.idViaje].id);

    if (bol){
      //luego verifica que el viaje no haya empezado y que queden asientos
      if ((this.viajes[this.idViaje].pasajeros >= this.viajes[this.idViaje].maxPasajeros) || (this.viajes[this.idViaje].estado != 0)){
        //si el viaje ya empezo o no quedan asientos disponibles
        this.callDialog("Este viaje ya no esta disponible");
        this.menuDepth = 0;
      } else {
        //Actualizar la cantidad de pasajeros del viaje
        this.firestore.updateDoc({pasajeros: this.viajes[this.idViaje].pasajeros+1}, 'Viajes',this.viajes[this.idViaje].id);
        //Actualizar el viaje del usuario
        this.firestore.updateDoc({viajeID: this.viajes[this.idViaje].id}, 'Usuarios',this.usuarioID);
        this.menuDepth = 2;

        //pasajeros: 1
      }
      
    } else {//Si el viaje que vas a reservar ya no existe
      this.callDialog("Este viaje ya no esta disponible");
      this.menuDepth = 0;
    }
  }

  cancelarReserva(){
    //Actualizar la cantidad de pasajeros del viaje
    this.firestore.updateDoc({pasajeros: this.viajes[this.idViaje].pasajeros-1}, 'Viajes',this.viajes[this.idViaje].id);
    //Actualizar el viaje del usuario
    this.firestore.updateDoc({viajeID: 'null'}, 'Usuarios',this.usuarioID);
    this.menuDepth = 0;
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
