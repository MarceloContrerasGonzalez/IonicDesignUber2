import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//importar BDD storage
import { ActiveUser } from 'src/app/clases/active-user';
import { DbserviceService } from 'src/app/services/SQL/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  user:any;

  usuarios: ActiveUser[];
  constructor(
    private activeroute: ActivatedRoute, 
    private servicioBD: DbserviceService,
    private router: Router) {}

  
    ngOnInit() {
      //Cargar la base de datos
      this.servicioBD.dbState().subscribe((res)=>{
        if(res){
          this.servicioBD.fetchUsuario().subscribe(item=>{
            this.usuarios=item;
          })
        }
      })
    }
  
}
