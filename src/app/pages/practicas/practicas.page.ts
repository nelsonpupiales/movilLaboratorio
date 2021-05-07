import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router'
import { DataApiService } from 'src/app/services/data-api.service';
import { ModalController } from '@ionic/angular';

import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-practicas',
  templateUrl: './practicas.page.html',
  styleUrls: ['./practicas.page.scss'],
})
export class PracticasPage implements OnInit {


  fecha = String;
  respuestaExperimento = String;
  datoSensor = String;
  idEstudiantePro: any;
  constructor(
    private router: ActivatedRoute,
    private dataApi: DataApiService,
    public modalController: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit(): void {

    //Obtengo el ID experimento
    const idExperimento = this.router.snapshot.params["id"];
    console.log("Entro Experimento: " + idExperimento);
   

    let idEstudiantePro = this.dataApi.cargaIdLS();
    console.log("Entro Estudiante -> " + idEstudiantePro);

    this.cargarPracticas(idExperimento, idEstudiantePro);
  }


  practicas = [];

  async cargarPracticas(idExperimento, idEstudiantePro) {
    console.log("Carga de practicas");
    (await this.dataApi.cargarPracticas(idExperimento))
      .subscribe(
        async practica => {
          console.log(practica);

          //this.practicas = practica;

          //Obtenemos la longitud del arreglo
          let longitud = (Object.keys(practica).length);
          console.log(longitud);

          for (let index = 0; index < longitud; index++) {
            var idEstudiante = practica[index]["idEstudiante"];

            if (idEstudiante == idEstudiantePro) {
              console.log("Id Estuiante -->" + idEstudiante)
              this.practicas.push(practica[index]);
            } else {
              console.log("No Datos")
            }
            console.log(this.practicas)
          }
        });
  }


  async presentModal(id) {
    (await this.dataApi.cargarUnaPractica(id))
      .subscribe(
        async practica => {
          console.log(practica);
          this.fecha = practica['fecha'];
          this.respuestaExperimento = practica['respuestaExperimento'];         
        });

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Practicas Realizadas',
      //subHeader: 'Usted puede observar la respuesta de la practica.',
      message: '<strong>Feha practica: </strong><br>' + this.fecha + '<br><br>' +
        '<strong>Respuesta:</strong> <br>' + this.respuestaExperimento + '',

      buttons: ['OK']
    });
    await alert.present();
  }


  

}
