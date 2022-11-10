import { Component } from '@angular/core';
//Firebase
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { usuariosI } from 'src/app/models/models';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  usuarioID = localStorage.getItem('usuarioActivo');

  constructor(private firestore: FirestoreService) {}

  async ngOnInit() {
    this.usuarioID = localStorage.getItem('usuarioActivo');
    await this.cargarUsuario();
  }

  async cargarUsuario(){
    await this.firestore.getDocument<usuariosI>('Usuarios',this.usuarioID).subscribe(res=>{
      console.log("usuario cargado en home page",res)
    });
  }
  
}
