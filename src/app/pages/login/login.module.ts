import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

//Lottie
import { LottieModule } from 'ngx-lottie';

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
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
