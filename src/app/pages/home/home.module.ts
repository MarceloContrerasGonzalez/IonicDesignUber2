import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

//Mat module  y dialog para la pagina de conducir
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

//Los componentes que heredaran todo esto
import { ConducirComponent } from 'src/app/components/Tabs/conducir/conducir.component';
import { BuscarViajesComponent } from 'src/app/components/Tabs/buscar-viajes/buscar-viajes.component';
import { InicioComponent } from 'src/app/components/Tabs/inicio/inicio.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    HomePageRoutingModule,
    MatDialogModule
  ],
  entryComponents: [DialogComponent],
  declarations: [HomePage, ConducirComponent, BuscarViajesComponent, InicioComponent]
})
export class HomePageModule {}
