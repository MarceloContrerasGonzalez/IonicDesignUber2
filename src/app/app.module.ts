import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importaciones angular material
import { MatInputModule } from '@angular/material/input';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

//modulo angular fire / firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//importar db firebase (cloud firestore)
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

=======

import { HttpClientModule } from '@angular/common/http';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
@NgModule({
  declarations: [
    AppComponent,  
    //DialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),//exportar las credenciales de environment ; inicializando con nuestras credenciales
    AngularFireAuthModule,
    AngularFirestoreModule//modulo de la base de datos
  ],
<<<<<<< HEAD
=======
  //entryComponents: [DialogComponent],
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }, SQLite],
  bootstrap: [AppComponent],
})

export class AppModule {}
