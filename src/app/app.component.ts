import { Component } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;
//import { MatDialog } from '@angular/material/dialog';
//import { DialogComponent } from './components/shared/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  componentDidLoad(){
    SplashScreen.hide();
  }

  constructor(
    //public dialog: MatDialog
  ) {}

  /*
  openDialog():void{
    const dialogRef = this.dialog.open(DialogComponent, {
      //estilo
      data: 'message'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

        if (res){
          console.log('Borrar fichero')
        }
    })

  }
  */
}
