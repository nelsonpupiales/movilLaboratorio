import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { ActivatedRoute, Params } from "@angular/router";
import { DataApiService } from "src/app/services/data-api.service";
import { AlertController, ToastController } from "@ionic/angular";

import { Chart } from "chart.js";
import { Subscription } from "rxjs";
//import * as Chart from "chart.js";

@Component({
  selector: "app-sensor",
  templateUrl: "./sensor.page.html",
  styleUrls: ["./sensor.page.scss"],
})
export class SensorPage implements OnInit {
  // Para grafica
  @ViewChild("lineCanvas") private lineCanvas: ElementRef;
  lineChart: Chart;

  //---------------------------------------------------------------------------

  nombreExperimento = String;
  preguntaExperimento = String;
  dataExperimento = String;
  labelExperimento = String;

  today: string;

  d: Date = new Date();
  mydate: string;

  constructor(
    private router: ActivatedRoute,
    private dataApi: DataApiService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ngAfterViewInit() {}

  idExperimento
  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString();
    console.log(this.d);

     this.idExperimento = this.router.snapshot.params["id"];
    console.log("IdExperimento: " + this.idExperimento);
    
    this.cargarUnExperimento(); // cargar todo el experimento

    //Carga nombre del estudiante
    let idEstudiante = this.dataApi.cargaIdLS();
    console.log("IdEstudainte: " + idEstudiante);

    console.log('inicio de temporizador');
    //this.temporizador()

    //crear muerte del reloj
    //this.stopTimer()
    
  }

  ngOnDestroy() {
    this.suscripctionCargarExperimento.unsubscribe();
    if(!this.reloj){
        console.log("reloj ya se ha parado");
        
    }else{
      console.log("aun no se habia parado el reloj yo lo har[e ");
      
      this.stopTimer()
    }
}

  suscripctionCargarExperimento: Subscription


  dataArrayStringToArray = []
  labelArrayStringToArray= []
  
  
  async cargarUnExperimento() {
    console.log(this.idExperimento);
    if(!this.idExperimento){
      return
    }

    this.suscripctionCargarExperimento = (await this.dataApi.cargarUnExperimento(this.idExperimento)).subscribe(
      async (experimento) => {
        console.log(experimento);
        //this.idTema= tema['id'];
        this.nombreExperimento = experimento["nombreExperimento"];
        this.preguntaExperimento = experimento["preguntaExperimento"];

        //console.log(experimento['dataExperimento'])
        //console.log(experimento['labelExperimento'])

        //Convierte String a Array valores de x con -y a +y
        this.dataArrayStringToArray = JSON.parse(
          "[" + experimento["dataExperimento"] + "]"
        );
        console.log(
          "array String convertido en array data",
          this.dataArrayStringToArray
        );

        console.log("-> " + this.dataArrayStringToArray[2]);

        //Coviente a String a Array valores de Label
        this.labelArrayStringToArray = JSON.parse(
          "[" + experimento["labelExperimento"] + "]"
        );
        console.log(
          "array String convertido en array label -->",
          this.labelArrayStringToArray
        );

        //this.temporizador()

        /*
        for (var val of labelArrayStringToArray) {
          console.log(this.dataArrayStringToArray[val]);
        }



        let TIME_IN_MS = 1000;
        let hideFooterTimeout = setTimeout(() => {
          console.log("Hola")
        }, TIME_IN_MS);
         */

        /*
          let TIME_IN_MS = 2000;
          for (let i = 0; i < 914; i++) {
            
            let hideFooterTimeout = setTimeout(() => {
              console.log(this.dataArrayStringToArray[i]);
              
            }, TIME_IN_MS);
          }
          */

        /*
          setTimeout(() => {
            console.log("Yo me imprimo un segundo después, es decir, mil milisegundos después :)");
          }, 1000);
          */

        /*function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        async function delayedGreeting() {
          for (let i = 0; i < 5; i++) {
            console.log(this.dataArrayStringToArray[i]);
            await sleep(1000);
          }
        }
        delayedGreeting();
        */

        //Envio a Graficar
        /*
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: "line",
          data: {
            labels: labelArrayStringToArray,
            datasets: [
              {
                label: "Puntos de Movimiento",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.dataArrayStringToArray,
                spanGaps: false,
              },
            ],
          },
        }); */

      }
    );
  }

  reloj: ReturnType<typeof setTimeout>
  temporizador(){
    console.log('tamano de arreglo ->',this.arraydeprueba.length);
    let timeConsulta = 2000
    let grupoDatos = 9
    this.reloj = setInterval(()=> this.actualizarChart(),timeConsulta);
    let tiempo = (this.dataArrayStringToArray.length/grupoDatos)*timeConsulta
    //let tiempo = ((this.arraydeprueba.length/grupoDatos)+1)*timeConsulta
    this.stopTimer(tiempo)
  }

  stopTimer( tiempo?){
    setTimeout(() => {
      clearInterval(this.reloj);
      console.log('reloj terminado');
      this.reloj = null;

    //pintar nuevamente el grafico con todos los valores
    this.actualizarChartAll()
      
    },tiempo || 0 );
  }


  arrayIntervalo = []
  arrayAcumulado= []
  rangoIntervaloInicial = 0
  arraydeprueba= [1,2,4,3,5,7,4,3,2,5,6,7,9,8,7,5,4,3,1,4,5,7,4,3,3,5,6,7,8,3,3,3,5]
  actualizarChart(){
    //inicializar la grafica con los primero N datos
    //establecer un grupo finito de datos a mostrar
    let intervalo = 1;
    this.arrayIntervalo = this.dataArrayStringToArray.slice(this.rangoIntervaloInicial,this.rangoIntervaloInicial+intervalo)
  //this.arrayIntervalo = this.arraydeprueba.slice(this.rangoIntervaloInicial,this.rangoIntervaloInicial+intervalo)
      

    console.log('rango actual inicio ->' + this.rangoIntervaloInicial+ ' final -> '+intervalo);
    console.log('datos -> ', this.arrayIntervalo);
    if(this.rangoIntervaloInicial==0){
      let labelfive = []
      labelfive.push(this.labelArrayStringToArray[0])
      labelfive.push(this.labelArrayStringToArray[1])
      labelfive.push(this.labelArrayStringToArray[2])
      labelfive.push(this.labelArrayStringToArray[3])
      labelfive.push(this.labelArrayStringToArray[4])

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          //labels: this.labelArrayStringToArray,
          labels: [0,1,2,3,4,5,6,7,8,9],

          datasets: [
            {
              label: "Puntos de Movimiento",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.arrayIntervalo,
              spanGaps: false,
            },
          ],
        },
      });
      }else if(this.rangoIntervaloInicial<=9) {

      this.lineChart.data.datasets.forEach(dataset =>{
        this.arrayIntervalo.forEach(item =>{
          dataset.data.push(item)

        })
      })
      this.lineChart.update()
    }else{
      // console.log('entr[e a los 20 y debo borrar los primero 5');
      //this.lineChart.data.datasets.splice(0,5)
      let contador = 1

      console.log('datos de labels -> ',this.lineChart.data.labels);

      console.log('tamano de labels -> ',this.lineChart.data.labels[this.lineChart.data.labels.length-1]);
      
     // this.lineChart.data.labels.shift(); // para borrar el primero 
    let labelFinal = parseInt((this.lineChart.data.labels[this.lineChart.data.labels.length-1]).toString())

      this.lineChart.data.labels.splice(0,1);// eliminar n datos desde una posicion

      this.lineChart.data.labels.push(labelFinal+1);

      /*
      this.lineChart.data.labels.forEach(label =>{
      let labelFinal = parseInt(this.lineChart.data.labels[this.lineChart.data.labels.length].toString())
    
          if(contador <=5){
            this.lineChart.data.labels.shift();
            this.lineChart.data.labels.push(labelFinal+1)
          }
          contador++  
      })
      */

      this.lineChart.data.datasets.forEach(dataset =>{

        dataset.data.splice(0,1);
      /* dataset.data.forEach(item=>{
          if(contador <=1){
            dataset.data.shift()
          }
          contador++
        })*/
        
      })
      this.lineChart.update();
      let arrayxx = []
    this.lineChart.data.datasets.forEach(dataset=>{
      dataset.data.forEach(item=>{
        arrayxx.push(item)
      })
    })

   // console.log(' datos acumulados dentro del else luego de borrar ', arrayxx);
      
      this.lineChart.data.datasets.forEach(dataset =>{
        this.arrayIntervalo.forEach(item =>{
          dataset.data.push(item)

        })
      })
      
      this.lineChart.update() 
    
    }
    let arrayxx = []
    this.lineChart.data.datasets.forEach(dataset=>{
      dataset.data.forEach(item=>{
        arrayxx.push(item)
      })
    })

    console.log(' datos acumulados chart afuera ', arrayxx);
    
     //fin del if

    this.rangoIntervaloInicial += intervalo;


  
  }

  actualizarChartAll(){ 

    this.lineChart.data.labels= this.labelArrayStringToArray;
    this.lineChart.data.datasets.forEach(dataset =>{
      dataset.data = [];
      this.dataArrayStringToArray.forEach(item =>{
        dataset.data.push(item)

      })
    })
    this.lineChart.update()


  }

  //Cargar Datos
  cargarDatos() {
    console.log("Datos");
  }

  //Agregar una respuesta
  async addRespuesta() {
    console.log("Respuesta");
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Respuesta",
      subHeader: "Ingrese su respuesta del experimento.",
      inputs: [
        {
          name: "respuestaExperimento",
          type: "textarea",
          placeholder: "Respuesta",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: async (alertData) => {
            console.log("Confirm Ok");

            const toast = await this.toastController.create({
              message: "Su practica fue agregada.",
              duration: 1000,
              color: "success",
            });
            toast.present();

            //En esta parte el estudiante se matricula en la materia
            var respuesta = alertData.respuestaExperimento;
            //console.log(alertData.respuestaExperimento);
            this.cargarPractica(respuesta);
          },
        },
      ],
    });
    await alert.present();
  }

  async cargarPractica(respuesta) {
    console.log(respuesta);

    //Cargar datos del estudiante
    let idEstudiante = this.dataApi.cargaIdLS();
    console.log("IdEstudainte: " + idEstudiante);

    var id = "";
    var datoSensor = "ddds32323e23e2e23";
    const idExperimento = this.router.snapshot.params["id"];

    //Extraemos la fecha del sistema
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();

    //Extraemos la hora del sistema
    var h = d.getHours();
    var m = d.getMinutes();
    var fecha = "Fecha: " + dd + "-" + mm + "-" + yy + " Hora: " + h + "." + m;

    const post = {
      id: id,
      idExperimento: idExperimento,
      idEstudiante: idEstudiante,
      datoSensor: datoSensor,
      respuestaExperimento: respuesta,
      fecha: fecha,
    };
    console.log(post);

    (await this.dataApi.guardarExperimentoEstudiante(post)).subscribe(
      async (data) => {
        console.log(data);
        //this.formLogin()
      }
    );
  }
}
