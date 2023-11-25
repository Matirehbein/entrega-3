import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { ElementRef, ViewChildren, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { AutentificarService } from '../servicio/servicio.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string;
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animation!: Animation;

  constructor(private navCtrl: NavController,private animationCtrl: AnimationController) {
  this.nombreUsuario = "nick(usuario)";
}
ngAfterViewInit() {
  this.animation = this.animationCtrl
    .create()
    .addElement(this.card.nativeElement)
    .duration(1500)
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2');
}

play() {
  this.animation.play();
}

pause() {
  this.animation.pause();
}

stop() {
  this.animation.stop();
}

// Función para redirigir a la página de inicio de sesión (login)
redirectToLogin() {
  this.navCtrl.navigateForward('/login');
}
}
