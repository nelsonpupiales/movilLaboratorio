import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params} from '@angular/router'
import { DataApiService } from 'src/app/services/data-api.service';
import { MateriaInterfaces } from 'src/app/models/materia.interfaces';

import { ModalController } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.page.html',
  styleUrls: ['./tema.page.scss'],
})
export class TemaPage implements OnInit {

  temas = null;

  public materia: MateriaInterfaces = {
    id: "",
    nombreMateria: "",
    descripcionMateria: "",
    codigoMateria: "",
    idDocente: "",
  }

  nombreMateria= String;
  codigoMateria = String;
  descripcionMateria = String;

  constructor(
    private router : ActivatedRoute,
    private dataApi: DataApiService,
    public modalController: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit(): void {
    const id = this.router.snapshot.params["id"];
    console.log("Entro: " + id);
    this.cargarUnaMatria(id);
    this.cargarTema(id)
  }


  async cargarUnaMatria(idMateria){
    console.log(idMateria);
    (await this.dataApi.cargarMateria(idMateria))
      .subscribe(
        async materia => {
          console.log(materia);
          this.nombreMateria = materia[0]['nombreMateria'];                                               
        });    
  }

  //Cargar Temas
  async cargarTema(idMateria){
    console.log("Tema");
    (await this.dataApi.cargarTema(idMateria))
      .subscribe(
        async tema => {
          console.log(tema);
          this.temas = tema;          
        });       
  }

  //Cargar Detalles
  async cargarDetalle(){
    //console.log("informacion")
    const id = this.router.snapshot.params["id"];
    
    (await this.dataApi.cargarMateria(id))
      .subscribe(
        async materia => {
          //console.log(materia);          
          this.nombreMateria = materia[0]['nombreMateria'];
          this.descripcionMateria = materia[0]['descripcionMateria'];
          
        });

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: '<strong>Materia: </strong>'+ this.nombreMateria +'<br><br>'+
      '<strong>Descripción : </strong>' +this.descripcionMateria+'',         
      
      buttons: ['OK']
    });
    await alert.present();
  }
  

}
