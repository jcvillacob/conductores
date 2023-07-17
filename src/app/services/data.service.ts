import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/api.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${API_CONFIG.baseUrl}`;
  private token: string = API_CONFIG.token;
  private cedula!: number;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.cedula = this.loginService.getCedula();
  }

  getAnticiposGV(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/AnticiposGV/10181377?token=${this.token}`);
  }

  getGastos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Legalizaciones/Conductor?token=${this.token}&Conductor=10181377`);
  }


}
