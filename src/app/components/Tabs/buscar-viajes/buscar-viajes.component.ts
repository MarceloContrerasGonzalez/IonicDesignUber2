import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
/* import { ApiClientService } from 'src/app/services/Api/api-client.service'; */

//importar BD SQlite
import { Viajes } from 'src/app/clases/viajes';
import { ActiveUser } from 'src/app/clases/active-user';
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.component.html',
  styleUrls: ['./buscar-viajes.component.scss'],
})
export class BuscarViajesComponent implements OnInit {
  viajes: Viajes[];
  pasajero: ActiveUser[];
  idViaje;
  menuDepth: Number = 0;
  
  
  constructor(/* private api: ApiClientService */
    private servicioBD: DbserviceService,
    public toastController: ToastController
  ){}

  ngOnInit() {
     //Cargar la base de datos con los viajes
    this.cargarBdd();

    //por default
    if (this.pasajero[0].viajeId != -1){
      //transformar la id de la BD por la id del array
      for (let i = 0; i < this.viajes.length; i++){
        if (this.viajes[i].id == this.pasajero[0].viajeId){
          this.idViaje = i;
          this.menuDepth = 2;
          break;
        }
      }
    } else {
      this.idViaje = 0;
    }
    
  }

  async ionViewWillEnter(){
    //Verificar si el pasajero tiene un viaje reservado, y comprobar si ese viaje siga activo
    if (this.pasajero[0].viajeId != -1){
      let q = await this.verificarViaje(this.pasajero[0].viajeId);

      if (q <= 0){
        this.menuDepth = 0;
      } 
    }
  }

   showFor(id){
      this.presentToast("tabla id: " + id)
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
        });
      }
    });
  }

   verificarViaje(id){
    //console.log("///////////////////////////////////////////////////////////")
     return this.servicioBD.checkViaje(id).then(length=>{
      //this.presentToast("lenght " + length)
      return length;//console.log(res);
    });
    //let q = this.servicioBD.checkViaje(id);
    //this.presentToast(q +"/--")
  };

  async elegirViaje(id){
    //actualizar los datos
    await this.cargarBdd();


    //transformar la id de la BD por la id del array
    for (let i = 0; i < this.viajes.length; i++){
      if (this.viajes[i].id == id){
        this.idViaje = i;
        if (this.viajes[this.idViaje].pasajeros >= this.viajes[this.idViaje].maxPasajeros){
          this.presentToast("lo siento master, pero ya esta lleno")
        } else {
          this.menuDepth = 1;
        }
        
        break;
      }
      
    }
    
  }

  reservarViaje(){
    this.servicioBD.updatePasajerosViaje(this.viajes[this.idViaje].pasajeros+1,this.viajes[this.idViaje].id);
    this.servicioBD.updateViajeUsuario(this.viajes[this.idViaje].id,this.pasajero[0].id);
    this.menuDepth = 2;
  }

  cancelarReserva(){
    this.servicioBD.updatePasajerosViaje(this.viajes[this.idViaje].pasajeros-1,this.viajes[this.idViaje].id);
    this.menuDepth = 0;
  }

  //no se para que es pero estaba en la guia, revisar
/*   compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }; */

  async presentToast(msg:string) {
		const toast = await this.toastController.create({
		  message: msg,
		  duration: 3500
		});
		toast.present();
	  };
}
