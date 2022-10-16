import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
/*
export class BuscarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

export class BuscarPage{
  
  alumno:any={
    id: null,
    nombre: "",
    username: "",
    password: ""
  };
  alumnos:any;

  viaje:any={
    userId: null,
    id:null,
    city: "",
    street: "",
    passengers: null,
    price: null
  };
  viajes:any;

  compareWith:any;

  constructor(private api: ApiClientService){}

  ionViewWillEnter(){
    this.getUsuarios();
    this.getViajes();
  }

  getUsuarios(){
    this.api.getUsuarios().subscribe((data)=>{
      console.log("----------Datauser 0----------");
      //Los usuarios son recibidos del github como un objeto, transformarlo a un array
      console.log(data);

      //const values = Object.values(data);
      //console.log("----------Datauser 1----------");
      //console.log(values);

      this.alumnos=data;
      //this.alumnos.reverse();
    });
  };

  getViajes(){
    this.api.getViajes().subscribe((data)=>{
      console.log("----------Dataviaje----------");
      console.log(data);
      this.viajes=data;
      this.viajes.reverse();
    });
  };

  //Esto buscara dentro de la bdd y pondra la informacion en el for del html
  setViaje(viaje){
    this.viaje=viaje;
    //this.get
    this.compareWith = this.compareWithFn;
  }

  showFor(id){
    console.log('tabla id: ' + id)
  }

  //no se para que es pero estaba en la guia, revisar
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
}
