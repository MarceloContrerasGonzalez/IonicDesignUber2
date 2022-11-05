import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {

  constructor(public navCtrl: NavController){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('ingresado')){
        if(localStorage.getItem('preferenciaAuto')){
          this.navCtrl.navigateRoot('home/tab/conducir')
          return false;
        }else if (localStorage.getItem('preferenciaViaje')){
          this.navCtrl.navigateRoot('home/tab/buscarViaje')
          return false;
        }else{
          this.navCtrl.navigateRoot('home')
          return false;
        }
      }else{
        return true;
      }
  }
  
}
