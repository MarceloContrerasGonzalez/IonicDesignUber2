import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

//componente para los tabs
import { BuscarViajesComponent } from 'src/app/components/Tabs/buscar-viajes/buscar-viajes.component';
import { ConducirComponent } from 'src/app/components/Tabs/conducir/conducir.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,

    //Se declaran las rutas hijas (componente) que cargara en el home
    children: [
      {
        path: 'conducir',
        component: ConducirComponent
      },
      {
        path: 'buscarViaje',
        component: BuscarViajesComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageRoutingModule {}
