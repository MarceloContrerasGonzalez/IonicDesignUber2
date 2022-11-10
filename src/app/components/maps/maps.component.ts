import { Component, OnInit, Input } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation';
import { ModalController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  @Input() position = {
    lat: -33.033536,
    lng: -71.533166
  };

  direccion:any ;

  label = {
    titulo: 'Ubicacion',
    subtitulo: 'Mi Destino'
  }

  map: any;
  infowindow: any;
  positionSet: any;
  marker: any;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(public modalController: ModalController) { }

  showMap() {

    const position = this.position;

    let latLng = new google.maps.LatLng(position.lat, position.lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false,
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false,
    });
    this.clickHandleEvent();
    this.infowindow = new google.maps.InfoWindow();
    /* this.addMarker(position); */
    this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);

  }

  clickHandleEvent() {

    this.map.addListener('click', (event: any) => {
          const position = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
          };
          this.addMarker(position);
          console.log(position);
          
    });
  
  }

  addMarker(position: any): void {
    const geocoder = new google.maps.Geocoder();

    let latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    //centra el mapa a la posicion seleccionada
    this.map.panTo(position);
    this.positionSet = position;
    geocoder.geocode({ location: position })
      .then((response) => {
        if (response.results[0]) {
          this.direccion = response.results[0].formatted_address
          console.log(this.direccion);
          this.label.titulo = 'Direccion';
          this.label.subtitulo = this.direccion;
          this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);

        }
      })

  }

  setInfoWindow(marker: any, titulo: string, subtitulo: string) {

    const contentString  =  '<div id="contentInsideMap">' +
                            '<div>' +
                            '</div>' +
                            '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                            '<div id="bodyContent">' +
                            '<p class"normal m-0">'
                            + subtitulo + '</p>' +
                            '</div>' +
                            '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  
  }

  ionViewDidEnter() {
    this.showMap();
  }

  async mylocation() {
    console.log('mylocation() click')
    Geolocation.getCurrentPosition().then((res) => {
      console.log('mylocation() -> get ', res);
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      }
      this.addMarker(position);
    });

  }

  aceptar() {
    this.modalController.dismiss({ pos: this.direccion })
  }

  ngOnInit() { }

}
