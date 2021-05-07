import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params} from '@angular/router'
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  idTema= String;
  nombreTema= String;
  introduccionTema= String;
  instruccionesTema = String;
  bibliografiaTema = String;
  //temas = null;

  constructor(
    private router : ActivatedRoute,
    private dataApi: DataApiService,

  ) { }

  ngOnInit(): void {
    const id = this.router.snapshot.params["id"];
    console.log("Entro: " + id);
    this.cargaUnaTema(id);
    //this.cargarTema(id)
  }


  async cargaUnaTema(idTema){
    console.log(idTema);
    (await this.dataApi.cargaUnTema(idTema))
      .subscribe(
        async tema => {
          console.log(tema);
          this.idTema= tema['id'];
          this.nombreTema = tema['nombreTema']; 
          this.introduccionTema = tema['introduccionTema'];
          this.instruccionesTema = tema['instruccionesTema'];
          this.bibliografiaTema = tema['bibliografiaTema'];
        });    
  }


}
