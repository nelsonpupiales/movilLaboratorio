import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { DataApiService } from 'src/app/services/data-api.service';
import { from } from 'rxjs';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private dataApi: DataApiService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    console.log("registro");

  }



  async procesoRegistro(nombreEstudiante, apellidoEstudiante, correoEstudiante, usuarioEstudiante, passEstudiante) {
    try {

      if (nombreEstudiante.value == '') {
        const toast = await this.toastController.create({
          message: 'Complete datos del Nombre',
          duration: 1000,
        });
        toast.present();
      } else if (apellidoEstudiante.value == '') {
        const toast = await this.toastController.create({
          message: 'Complete datos del Apellido',
          duration: 1000,
        });
        toast.present();
      } else if (correoEstudiante.value == '') {
        const toast = await this.toastController.create({
          message: 'Complete datos del Correo',
          duration: 1000,
        });
        toast.present();
      } else if (usuarioEstudiante.value == '') {
        const toast = await this.toastController.create({
          message: 'Complete datos del Usuario Estudiante',
          duration: 1000,
        });
        toast.present();
      } else if (passEstudiante.value == '') {
        const toast = await this.toastController.create({
          message: 'Complete datos del Password Estudiante',
          duration: 1000,
        });
        toast.present();
      } else {


        const id = '';
        const nombre = nombreEstudiante.value;
        const apellido = apellidoEstudiante.value;
        const correo = correoEstudiante.value;
        const usuario = usuarioEstudiante.value;
        const pass = passEstudiante.value

        const post = {
          'id': id,
          'nombreEstudiante': nombre,
          'apellidoEstudiante': apellido,
          'correoEstudiante': correo,
          'usuarioEstudiante': usuario,
          'passEstudiante': pass

        };
        console.log(post);
        (await this.dataApi.guardarEstudiante(post))
          .subscribe(
            async data => {
              console.log(data)
              this.formLogin()
            });
      }
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  formLogin() {
    this.router.navigate(['/login']);
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}


