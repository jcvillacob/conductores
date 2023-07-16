import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  cedula!: number;
  private notyf: Notyf;

  constructor(private loginService: LoginService, private router: Router) {
    this.notyf = new Notyf({
      position: {
        x: 'center',
        y: 'top',
      },
      duration: 3000, // duración de la notificación en milisegundos (opcional)
      ripple: false,  // si quieres el efecto ripple (opcional)
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (!this.cedula) {
      this.notyf.error('Ingresa una Cédula');
    } else {
      this.loginService.login(this.cedula);
      this.router.navigate(['/home']);
    }
  }
}
