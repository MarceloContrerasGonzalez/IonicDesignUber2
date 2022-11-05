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

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.component.html',
  styleUrls: ['./buscar-viajes.component.scss'],
})
export class BuscarViajesComponent implements OnInit {
  viajes: Viajes[];
  pasajero: ActiveUser[];
  idViaje;//id del viaje dentro del array de datos locales
  menuDepth: Number = 0;
  usuarioID = parseInt(localStorage.getItem('usuarioActivo'));
  
  
  
  constructor(/* private api: ApiClientService */
    private servicioBD: DbserviceService,
    public toastController: ToastController,
    public dialog: MatDialog
  ){}

  ngOnInit() {
     //Cargar la base de datos con los viajes
    this.cargarBdd();
    localStorage.removeItem('preferenciaAuto')
    localStorage.setItem('preferenciaViaje','true')  
  }

  async ionViewWillEnter(){
    this.menuDepth = 0;
    //Actualizar la base de datos
    this.cargarBdd();

    //Verificar si el pasajero tiene un viaje reservado, y comprobar si ese viaje siga activo
    if (this.pasajero[this.usuarioID].viajeId != -1){
      let q = await this.verificarViaje(this.pasajero[this.usuarioID].viajeId);

      if (q <= 0){
        this.callDialog("Este viaje ya no esta disponible");
        this.servicioBD.updateViajeUsuario(-1,this.pasajero[this.usuarioID].id); //el -1 le indica a la carga de la BD que el usuario ya no tiene reservacion en algun viaje
        this.menuDepth = 0;
      } 
    } else {
      //si no tenias un vehiculo reservado, verificar que no estuvieras en el menu (el menu justo antes de clickear un viaje)
      if (this.menuDepth == 1){

        //El try es en caso de que la base de datos ya no se quede con viajes y por ende, el array quede vacio
        try{
          let q = await this.verificarViaje(this.viajes[this.idViaje].id);

          if (q <= 0){
            this.callDialog("Este viaje ya no esta disponible");
            this.menuDepth = 0;
          }
        } catch (error) {
          this.callDialog("Este viaje ya no esta disponible");
          this.menuDepth = 0;
        }
        
      }
    }
  }

  cargarBdd(){
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        //viajes
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.viajes=item;
        })

        //usuario activo actual
        this.servicioBD.fetchUsuario().subscribe(user => {
          this.pasajero = user;

            //por default
            if (this.pasajero[this.usuarioID].viajeId != -1){
              //transformar la id de la BD por la id del array
              for (let i = 0; i < this.viajes.length; i++){
                if (this.viajes[i].id == this.pasajero[this.usuarioID].viajeId){
                  this.idViaje = i;
                  this.menuDepth = 2;
                  break;
                }
              }
            }

        });
      }
    });
  }

  

   //Verifica que el viaje que se tenga guardado exista (el length debe ser mayor a 1 para eso)
   verificarViaje(id){
     return this.servicioBD.checkViaje(id).then(length=>{
      return length;//console.log(res);
    });
  };

  
  async elegirViaje(id){
    //actualizar los datos
    await this.cargarBdd();

    //transformar la id de la BD por la del array
    for (let i = 0; i < this.viajes.length; i++){
      if (this.viajes[i].id == id){
        this.idViaje = i;

        //esta validacion es simulando como funcionanira en una BD de verdad
        //Primero verifica que el viaje siga existiendo
        if (this.verificarViaje(this.viajes[this.idViaje].id)){
          //luego verifica que el viaje no haya empezado y que queden asientos
            if ((this.viajes[this.idViaje].pasajeros >= this.viajes[this.idViaje].maxPasajeros) || (this.viajes[this.idViaje].estado != 0)){
              this.callDialog("Este viaje ya no esta disponible");
            } else {
              this.menuDepth = 1;
            }
            break;
          }
        }
    }
  }


  async reservarViaje(){
    //actualizar los datos
    await this.cargarBdd();

    //El try es en caso de que la base de datos ya no se quede con viajes y por ende, el array quede vacio
    try{
      //Primero verifica que el viaje siga existiendo
      if (this.verificarViaje(this.viajes[this.idViaje].id)){
        //luego verifica que el viaje no haya empezado y que queden asientos
        if ((this.viajes[this.idViaje].pasajeros >= this.viajes[this.idViaje].maxPasajeros) || (this.viajes[this.idViaje].estado != 0)){
            //si el viaje ya empezo o no quedan asientos disponibles
            this.callDialog("Este viaje ya no esta disponible");
            this.menuDepth = 0;
        } else {
            this.servicioBD.updatePasajerosViaje(this.viajes[this.idViaje].pasajeros+1,this.viajes[this.idViaje].id);
            this.servicioBD.updateViajeUsuario(this.viajes[this.idViaje].id,this.pasajero[this.usuarioID].id);
            this.menuDepth = 2;
        }
      } else {
        //Si el viaje ya no existe (se cancelo), volver al menu
        this.callDialog("Este viaje ya no esta disponible");
        this.menuDepth = 0;
      }
    } catch(error){
      this.callDialog("Este viaje ya no esta disponible");
      this.menuDepth = 0;
    }
  }

  cancelarReserva(){
    this.servicioBD.updatePasajerosViaje(this.viajes[this.idViaje].pasajeros-1,this.viajes[this.idViaje].id);
    this.servicioBD.updateViajeUsuario(-1,this.pasajero[this.usuarioID].id); //el -1 le indica a la carga de la BD que el usuario ya no tiene reservacion en algun viaje
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
