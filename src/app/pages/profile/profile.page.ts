import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EstudianteInterfaces } from 'src/app/models/estudiante.interfaces';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  
  estudiantes = null;

  nombreEstudiante= String;
  apellidoEstudiante = String;
  correoEstudiante = String;
  usuarioEstudiante = String;
  passEstudiante = String;


  public estudiante: EstudianteInterfaces = {
    id: "",
    nombreEstudiante: "",
    apellidoEstudiante: "",
    correoEstudiante: "",
    usuarioEstudiante: "",
    passEstudiante: "",
  }


  constructor(
    private router: Router,
    public alertController: AlertController,
    private dataApi: DataApiService,
  ) { }

  ngOnInit(): void {
    let idEstudiante = this.dataApi.cargaIdLS();
    console.log("Entro: " + idEstudiante);

    this.cargaEstudiante(idEstudiante);
  }

  materia() {
    this.router.navigate(['./materia']);
  }

  logout() {
    this.router.navigate(['/home']);
  }


  async cargaEstudiante(idEstudiante) {
    (await this.dataApi.cargaEstudiante(idEstudiante))
      .subscribe(
        async estudiante => {
          console.log(estudiante);
          this.nombreEstudiante = estudiante['nombreEstudiante'];         
          this.apellidoEstudiante = estudiante['apellidoEstudiante'];
          this.correoEstudiante = estudiante['correoEstudiante'];
          this.usuarioEstudiante = estudiante['usuarioEstudiante'];
          this.passEstudiante = estudiante['passEstudiante'];

        });
  }
}

