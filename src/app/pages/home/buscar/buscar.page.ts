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
  usuario:any;
  usuarios:any;

  viajes:any;
  viaje:any={
    userId: null,
    id:null,
    city: "",
    street: "",
    passengers: null,
    price: null
  };

  compareWith:any;

  constructor(private api: ApiClientService){}

  ionViewWillEnter(){
    //this.getUsuarios();
    this.getViajes();
  }


  //getUsuarios(){};
  getViajes(){
    this.api.getViajes().subscribe((data)=>{
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
