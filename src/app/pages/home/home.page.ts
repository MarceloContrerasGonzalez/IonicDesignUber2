import { Component } from '@angular/core';
<<<<<<< HEAD
//Firebase
import { FirestoreService } from 'src/app/services/Firebase/FireStore DB/firestore.service';
import { usuariosI } from 'src/app/models/models';
=======

>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
<<<<<<< HEAD
  usuarioID = localStorage.getItem('usuarioActivo');

  constructor(private firestore: FirestoreService) {}

  async ngOnInit() {
    this.usuarioID = localStorage.getItem('usuarioActivo');
    await this.cargarUsuario();
  }

  async cargarUsuario(){
    await this.firestore.getDocument<usuariosI>('Usuarios',this.usuarioID).subscribe(res=>{
      //this.usuario = res;
      console.log("usuario cargado en home page",res)
    });
  }
=======
  constructor() {}
    ngOnInit() {
    };
>>>>>>> e4ca7ea5443071a28b5ff9255dd1a9d420f886c3
  
}
