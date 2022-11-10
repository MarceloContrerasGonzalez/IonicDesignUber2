import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiClientService {
  httpOptions ={
    hearder: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }

  //Establecer la base url del api a consumir
  apiURL = 'http://192.168.100.5:3000';
  apiGithub = 'https://nancyb3a.github.io/Test/usuarios_PGY4121_01.json';

  constructor(private http:HttpClient) { }

  //Recojer todos los usuarios de la bdd
  getUsuarios():Observable<any>{
    return this.http.get(this.apiGithub).pipe(
      retry(3)
    );
  }

  //Recojer el dato de un viaje en especifico
  getViaje(id):Observable<any>{
    return this.http.get(this.apiURL+'/viajes/'+id).pipe(
      retry(3)//Si no se conecta al sv 3 en 3 oportunidades, no lo hara
    );
  }
  //Recojer todos los viajes activos de la bdd
  getViajes():Observable<any>{
    return this.http.get(this.apiURL+'/viajes/').pipe(
      retry(3)
    );
  }
  

}
