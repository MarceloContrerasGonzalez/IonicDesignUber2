import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecovpassPage } from './recovpass.page';

const routes: Routes = [
  {
    path: '',
    component: RecovpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecovpassPageRoutingModule {}
