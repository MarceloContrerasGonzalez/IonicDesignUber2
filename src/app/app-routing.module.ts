import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recovpass',
    loadChildren: () => import('./pages/recovpass/recovpass.module').then( m => m.RecovpassPageModule)
  },
  {
    path: 'conducir',
    loadChildren: () => import('./pages/home/conducir/conducir.module').then( m => m.ConducirPageModule)
  },
  {
    path: 'buscar',
    loadChildren: () => import('./pages/home/buscar/buscar.module').then( m => m.BuscarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
