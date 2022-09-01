import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecovpassPageRoutingModule } from './recovpass-routing.module';

import { RecovpassPage } from './recovpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecovpassPageRoutingModule
  ],
  declarations: [RecovpassPage]
})
export class RecovpassPageModule {}
