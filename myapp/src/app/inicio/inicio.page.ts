import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { Capacitor } from '@capacitor/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';  // Importa BarcodeScanner
import { Plugins, } from '@capacitor/core';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode';

const { TextToSpeech } = Plugins as any; 
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  codigoQR: string = '';


  public user = {
    usuario: "",
    pass: ""
  }
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.pass = state['user'].pass;
        console.log(this.user);
      }
    })
  }
  
  irASesion() {
    this.router.navigate(['/login']); // Navega a la página de inicio de sesión
  }

  
  async escanearQR() {
    if (Capacitor.isPluginAvailable('BarcodeScanner')) { // verifica si el plugin 'BarcodeScanner'
      try {
        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
          window.open(result.content, '_blank');
        }                                              // Esto maneja errores potenciales
      } catch (error) {
        console.error('Error al escanear:', error);
      }
    } else {
      console.warn('La funcionalidad de escaneo de QR solo está disponible en dispositivos nativos.');
    }
  }


  async generarQR(enlace: string) {
    try {
      this.codigoQR = await QRCode.toDataURL(enlace);
      console.log('Código QR generado:', this.codigoQR);
    } catch (error) {
      console.error('Error al generar el código QR:', error);
    }
  }

  generarCodigoQR() {
    const enlaceParaQR = 'https://www.duoc.cl/'; // Reemplaza esto con tu enlace deseado
    this.generarQR(enlaceParaQR);
  }

}