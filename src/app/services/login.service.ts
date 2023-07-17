import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private cedula!: number;

  constructor() { }

  login(cedula: number) {
    this.cedula = cedula;
    console.log(this.cedula);
  }

  getCedula (){
    return this.cedula;
  }
}
