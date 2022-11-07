import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

//Lottie
import { LottieModule } from 'ngx-lottie';

//Angular material Dialog
import { MatDialogModule } from '@angular/material/dialog';
//import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

export function playerFactory(){
  return import('lottie-web');//player
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }), 
    MatDialogModule
  ],
  //entryComponents: [DialogComponent],
  declarations: [LoginPage/*,
DialogComponent*/]
})
export class LoginPageModule {}
