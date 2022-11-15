import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importaciones angular material
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
//import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

//modulo angular fire / firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//importar db firebase (cloud firestore)
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@NgModule({
  declarations: [
    AppComponent,  
    DialogComponent
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
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }, EmailComposer],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})

export class AppModule {}
