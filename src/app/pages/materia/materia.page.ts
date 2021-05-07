import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { EstudianteInterfaces } from 'src/app/models/estudiante.interfaces';
import { DataApiService } from 'src/app/services/data-api.service';
import { MateriaEstudianteInterfaces } from 'src/app/models/materiaestudiante.interfaces';

import { CommonModule } from "@angular/common";

import { IonContent, } from '@ionic/angular';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
})
export class MateriaPage implements OnInit {

  //@ViewChild(IonContent, {static: false}) content: IonContent;  

  nombreEstudiante = String;

  public estudiante: EstudianteInterfaces = {
    id: "",
    nombreEstudiante: "",
    apellidoEstudiante: "",
    correoEstudiante: "",
    usuarioEstudiante: "",
    passEstudiante: "",
  }

  materiaestudiantes: any;

  public materiaestudiante: MateriaEstudianteInterfaces = {
    id: "",
    idEstudiante: "",
    idMateria: ""
  }

  //materias: any[] = [];
  materias: any[] = [];
  //materias: null;


  constructor(
    private router: Router,
    public alertController: AlertController,
    private dataApi: DataApiService,
    public toastController: ToastController,
    public commonModule: CommonModule
  ) { }

  ngOnInit(): void {
    let idEstudiante = this.dataApi.cargaIdLS();
    console.log("Entro: " + idEstudiante)
    this.cargaEstudiante(idEstudiante);
    this.cargaListaMateria(idEstudiante);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  sensor() {
    this.router.navigate(['/sensor']);
  }


  async cargaEstudiante(idEstudiante) {
    (await this.dataApi.cargaEstudiante(idEstudiante))
      .subscribe(
        async estudiante => {
          console.log(estudiante)
          this.nombreEstudiante = estudiante['nombreEstudiante'];
        });
  }


  //Carga la lista de materias
  async cargaListaMateria(idEstudiante?) {
    (await this.dataApi.cargaListaMateriasEstudiantes(idEstudiante))
      .subscribe(
        async materiaestudiante => {
          //Obtener la longitud del JSON
          let longitud = (Object.keys(materiaestudiante).length)

          for (let i = 0; i < longitud; i++) {
            console.log(materiaestudiante[i].idMateria)
            let idMateria = materiaestudiante[i].idMateria;
            (await this.dataApi.cargarMateria(idMateria))
              .subscribe(
                async materia => {                
                  console.log(materia)                    
                  this.materias.push(materia)
                  //this.materias = materia;   
                }
              );
          }
        });
  }



  //Agrega una nueva Materia
  async addMateria() {
    console.log('materia');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Materia',
      subHeader: 'Ingrese el codigo para acceder a la materia.',
      inputs: [
        {
          name: 'codigoMateria',
          type: 'text',
          placeholder: 'Codigo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            console.log('Confirm Ok');
            //En esta parte el estudiante se matricula en la materia
            this.cargaMateria(alertData.codigoMateria);
          }
        }
      ]
    });
    await alert.present();
  }





  //Salir de la pagina
  logout() {

    localStorage.clear();
    this.doRefreshLogin();
    this.router.navigate(['/home']);
  }


  //Regresca la pagina
  doRefresh(event) {
    console.log('Recarga la página');
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  //Refresca a la hora de cargar el login
  doRefreshLogin() {
    console.log('Recarga la página');
    setTimeout(() => {
    }, 1000);
  }


  //Carga materia
  async cargaMateria(codigoMateria) {
    console.log(codigoMateria);
    (await this.dataApi.cargarCodeMateria(codigoMateria))
      .subscribe(
        async materia => {

          if (materia == null) {
            const toast = await this.toastController.create({
              message: 'Codigo invalido',
              duration: 1000,
              color: 'warning',
            });
            toast.present();
          } else if (materia['codigoMateria'] == " ") {
            const toast = await this.toastController.create({
              message: 'Ya esta inscrito en ' + '<strong>' + materia['nombreMateria'] + '</strong>',
              duration: 1500,
              color: 'warning',
            });
            toast.present();

          } else {
            //Obtengo el id de la materia y el id del estudiante para volver a guardar en una tripleta
            const id = '';
            let idMateria = materia['id'];
            let idEstudiante = this.dataApi.cargaIdLS();

            //Almacenar una materia en el fichero 
            const materiaestudiante = {
              'id': id,
              'idMateria': idMateria,
              'idEstudiante': idEstudiante
            };
            console.log(materiaestudiante);
            (await this.dataApi.guardarMateriaEstudiante(materiaestudiante))
              .subscribe(
                async data => {
                  console.log(data)
                });
          }
        });
  }


  async materia(id) {
    console.log(id)
  }
}





