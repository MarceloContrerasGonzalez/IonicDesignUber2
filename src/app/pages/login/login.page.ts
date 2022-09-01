import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
//import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
/*
export class LoginPage implements OnInit {
dato:any;

constructor(private activeroute: ActivatedRoute, private router: Router) {
	this.activeroute.queryParams.subscribe(params => {
		if (this.router.getCurrentNavigation().extras.state) {
			this.dato = this.router.getCurrentNavigation().extras.state.dato;
			console.log(this.dato)
		}
	});
}

  ngOnInit() {
  }

}
*/

export class LoginPage implements OnInit {
	dato:string;
	
	constructor(
		private router: Router
	  ) {}

	  InSesion(){
		//state para pasar parametros a la otra pagina
		let navigationExtras: NavigationExtras={
		  state: {dato: this.dato}
		}
		//cambiar de pagina, pasar el parametro de state
		this.router.navigate(['/home'], navigationExtras)
	  }
	
	  ngOnInit() {
	  }
	
}