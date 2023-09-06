import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/api.config';
import { Personales } from '../models/personales';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${API_CONFIG.baseUrl}`;
  private token: string = API_CONFIG.token;
  private cedula!: string;
  private datosPersonales!: Personales;

  constructor(private http: HttpClient, private router: Router) { }

  login(cedula: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Conductores/${cedula}?token=${this.token}`);
  }

  setDatos(datos: Personales): void {
    this.datosPersonales = datos;
    this.cedula = this.datosPersonales.cedula;
  }

  getCedula () {
    return this.cedula;
  }

  getDatos () {
    return this.datosPersonales;
  }

  deleteCedula () {
    this.cedula = '';
    this.router.navigate(['/login']);
  }
}
