import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/Api/api-client.service';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.component.html',
  styleUrls: ['./buscar-viajes.component.scss'],
})
export class BuscarViajesComponent implements OnInit {
  ngOnInit() {}

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
    this.getViajes();
  }

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
