import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AnticiposComponent } from './components/anticipos/anticipos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'anticipos', component: AnticiposComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'gastos', component: GastosComponent },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
