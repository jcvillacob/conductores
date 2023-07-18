import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AnticiposComponent } from './components/anticipos/anticipos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { HelpComponent } from './components/help/help.component';
import { cedulaGuardGuard } from './cedula-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [cedulaGuardGuard] },
  { path: 'anticipos', component: AnticiposComponent, canActivate: [cedulaGuardGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [cedulaGuardGuard] },
  { path: 'gastos', component: GastosComponent, canActivate: [cedulaGuardGuard] },
  { path: 'help', component: HelpComponent, canActivate: [cedulaGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
