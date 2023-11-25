import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage-angular';

interface User {
  username:String;
  password:String;
  
}

@Injectable({
  providedIn: 'root'
})
export class AutentificarService {
  public activo!: Boolean;
  public local!: Storage;

  constructor(private route:Router,private global:Storage) {
    this.iniciar();
   }

  async iniciar(){
    const Storage = await this.global.create();
    this.local = Storage;
  }

  async register(username: string, password: string): Promise<Boolean> {
    const users = await this.local?.get('users') || [];
    const existe = users.find((us: User) => us.username === username && us.password === password);
    if (existe) {
      console.log("Usuario Existente")
      return true;
    } else {
      const nuevo: User = { username, password };
      users.push(nuevo);
      await this.local.set('users', users);
      console.log("Registro Exitoso")
      return false;
    }
  }

    async login(username:String,password:String): Promise<Boolean>{
      const users = await this.local.get('users') || [];
      const user = users.find((us:User) => user.username===username && user.password===password);

      if(user) {
        this.activo = true;
        return true;
      }
      this.activo = false;
      return false;

    }

    logout(){
      this.activo=false;
      this.route.navigate(['/home']);
    }


}
