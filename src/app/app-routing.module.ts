import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginGuards } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule )
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [LogoutGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule), canActivate: [LogoutGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule), canActivate: [LoginGuards]
  },
  {
    path: 'materia',
    loadChildren: () => import('./pages/materia/materia.module').then( m => m.MateriaPageModule), canActivate: [LoginGuards]  
  },
  {
    path: 'experimento/:id',
    loadChildren: () => import('./pages/experimento/experimento.module').then( m => m.ExperimentoPageModule), canActivate: [LoginGuards]
  },
  {
    path: 'sensor/:id',
    loadChildren: () => import('./pages/sensor/sensor.module').then( m => m.SensorPageModule), canActivate: [LoginGuards]
  },
  {
    path: 'detalles/:id',
    loadChildren: () => import('./pages/detalles/detalles.module').then( m => m.DetallesPageModule), canActivate: [LoginGuards]
  },
  {
    path: 'tema/:id',
    loadChildren: () => import('./pages/tema/tema.module').then( m => m.TemaPageModule), canActivate: [LoginGuards]
  },
  {
    path: 'practicas/:id',
    loadChildren: () => import('./pages/practicas/practicas.module').then( m => m.PracticasPageModule), canActivate: [LoginGuards]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
