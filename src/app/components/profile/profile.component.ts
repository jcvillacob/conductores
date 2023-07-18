import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  datosPersonales: any = {};

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.datosPersonales = this.loginService.getDatos();
  }

  cerrarSesion() {
    this.loginService.deleteCedula();
  }

}
