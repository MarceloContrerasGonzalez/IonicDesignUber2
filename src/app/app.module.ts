import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importaciones angular material
import { MatInputModule } from '@angular/material/input';
/* import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/shared/dialog/dialog.component'; */
@NgModule({
  declarations: [
    AppComponent,  
    //DialogComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatInputModule,
    //MatDialogModule
  ],
  //entryComponents: [DialogComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
