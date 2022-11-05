import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

//componente para los tabs
import { BuscarViajesComponent } from 'src/app/components/Tabs/buscar-viajes/buscar-viajes.component';
import { ConducirComponent } from 'src/app/components/Tabs/conducir/conducir.component';
import { InicioComponent } from 'src/app/components/Tabs/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'tab',
    component: HomePage,

    //Se declaran las rutas hijas (componente) que cargara en el home
    children: [
      {
        path: 'conducir',
        component: ConducirComponent
      },
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'buscarViaje',
        component: BuscarViajesComponent
      },
      {
        path: '',
        redirectTo: 'tab/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tab/inicio',
    pathMatch: 'full'
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
