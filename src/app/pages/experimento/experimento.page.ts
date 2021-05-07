import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router'
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-experimento',
  templateUrl: './experimento.page.html',
  styleUrls: ['./experimento.page.scss'],
})
export class ExperimentoPage implements OnInit {

  experimentos = null;

  constructor(
    private router: ActivatedRoute,
    private dataApi: DataApiService,
  ) { }

  ngOnInit(): void {
    const idTema = this.router.snapshot.params["id"];
    console.log("Entro: " + idTema);
    this.cargarExperimento(idTema);
  }

  async cargarExperimento(idTema) {
    console.log("Tema");
    (await this.dataApi.cargarExperimentos(idTema))
      .subscribe(
        async experimento => {
          console.log(experimento);
          this.experimentos = experimento;
        });
  }

}


