import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AutentificarService } from '../servicio/servicio.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  user = {
    usuario: "",
    password: ""
    
  }
  
  @ViewChild(IonModal) modal!: IonModal

  constructor(private router:Router, private activeRouter:ActivatedRoute, private auth: AutentificarService) { }
  public mensaje = "";
  public estado: String = "";
  public alertButtons = ['OK'];
  ngOnInit() {
  }
  irASesion() {
    this.router.navigate(['/recuperar']); // Navega a la página de inicio de sesión
  }

  // sistema de autenticación del usuario 
  irInicio() {
    this.auth.login(this.user.usuario, this.user.password).then(() => {
      if (this.auth.activo){

        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
      }   
    this.router.navigate(['/inicio'],navigationExtras); 
  } else {
    this.mensaje = '¡Las casillas de Usuario y Contraseña no pueden estar vacios!';
  }
    });
    
    const navigationExtras: NavigationExtras = {
      state: { user: this.user}
    }
    this.router.navigate(['/inicio'],navigationExtras); // Navega a la página de inicio de sesión
  } 
   
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

    


  confirm() {
    this.auth.register(this.user.usuario, this.user.password).then((res) => {
      if(res) {
        this.estado = "El usuario ya existe";
  
      }else{
        this.mensaje="Usuario registrado con exito";
        this.modal.dismiss(this.user.usuario, 'confirm');
      }
    })
  }
  
}


