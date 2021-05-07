import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private dataApi: DataApiService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    console.log("login");    
  }

  async procesoLogin(usuarioEstudiante, passEstudiante) {
    try {

      if (usuarioEstudiante.value == '') {
        const toast = await this.toastController.create({
          message: 'Complete datos del Usuario',
          duration: 1000,
        });
        toast.present();
      } else if (passEstudiante.value == '') {
        const toast = await this.toastController.create({
          message: 'Complete datos del Password',
          duration: 1000,
        });
        toast.present();
      } else {
        const usuario = usuarioEstudiante.value;
        const pass = passEstudiante.value
        console.log(usuario + " - " + pass);

        var usuarioEstudiante = usuario;
        //Consultar si existe usuario        
        (await this.dataApi.loginEstudiante(usuario))
          .subscribe(
            async data => {
              //console.log(data['id'])                       
              if (data == null) {
                const toast = await this.toastController.create({
                  message: 'No se encontro Usuario',
                  duration: 1000,
                  color: 'warning',
                });
                toast.present();
              } else if (pass == data['passEstudiante']) {
                const toast = await this.toastController.create({
                  message: 'Bienvenido ' + data['nombreEstudiante'],
                  duration: 1000,
                  color: 'success',
                });
                toast.present();

                //Genera Token
                let token = data['id'];
                this.dataApi.setToken(token);

                //Carga el componente materia
                this.router.navigate(['/materia']);
                
              } else {
                const toast = await this.toastController.create({
                  message: 'Clave incorrecta',
                  duration: 1000,
                  color: 'danger',
                });
                toast.present();
              }
            });
      }
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  formRegister() {
    this.router.navigate(['/register']);
  }

}

