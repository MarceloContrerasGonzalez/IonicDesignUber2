import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,

    //Se declaran las rutas hijas (componente) que cargara en el home
    children: [
      {
        path: 'conducir',
        //component: Componente
        loadChildren: () => import('./conducir/conducir.module').then( m => m.ConducirPageModule)
      },
      {
        path: 'buscar',
        loadChildren: () => import('./buscar/buscar.module').then( m => m.BuscarPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
