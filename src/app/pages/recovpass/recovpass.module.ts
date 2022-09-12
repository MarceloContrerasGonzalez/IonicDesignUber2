import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecovpassPageRoutingModule } from './recovpass-routing.module';
import { RecovpassPage } from './recovpass.page';

//Angular material Dialog
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecovpassPageRoutingModule,
    MatDialogModule
  ],
  entryComponents: [DialogComponent],
  declarations: [RecovpassPage,
    DialogComponent
  ]
})
export class RecovpassPageModule {}
