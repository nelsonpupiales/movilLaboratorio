import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  URL = "http://localhost:8080";

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(
    private http: HttpClient
  ) { }

  async guardarEstudiante(estudiante) {
    return this.http.post(this.URL + '/guardarEstudiante', estudiante, { responseType: 'text' });
  }

  async loginEstudiante(usuarioEstudiante) {
    return this.http.get(`${this.URL}/loginEstudiante/${usuarioEstudiante}`);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  //Carga Tutor desde el localStore
  cargaIdLS(){
    let id = localStorage.getItem("accessToken");
    if (!isNullOrUndefined(id)) {     
      console.log(id)
      return id;
    } else {
      return null;
    }
  }


  //Carga Estudiante
  async cargaEstudiante(id) {
    return this.http.get(`${this.URL}/cargaEstudiante/${id}`);
  }



  getToken() {
    let token_string = localStorage.getItem("accessToken");    
    if (!(token_string === undefined || token_string === null)) {
      let token: String = (token_string);
      console.log(token)
      return token;
    } else {
      return null;
    }
  }



  
  //________________________________________________ Materia _______________________________________

  //Guarda una materia
  async guardarMateriaEstudiante(materiaestudiante) {
    return this.http.post(this.URL + '/guardarMateriaEstudiante', materiaestudiante, { responseType: 'text' });
  }

  //Carga una materia con el Codigo
  async cargarCodeMateria(id){
    return this.http.get(`${this.URL}/detalleCodeMateria/${id}`);
  }


   //Carga una materia con el Codigo
   async cargarMateria(id){
    return this.http.get(`${this.URL}/CodeMateriaList/${id}`);
  }
  


  //Cargar lista de materias que el estudiante esta incrito desde la tabla MateriaEstudiantes
  async cargaListaMateriasEstudiantes(idEstudiante){
    return this.http.get(`${this.URL}/cargaListaMateriasEstudiante/${idEstudiante}`);
  }


  //________________________________________________ Tema _______________________________________
  
  //Cargar Tema
  async cargarTema(idMateria){
    return this.http.get(`${this.URL}/cargarTemas/${idMateria}`);
  }

  //Cargar Tema
  async cargaUnTema(idTema){
    return this.http.get(`${this.URL}/cargaUnTema/${idTema}`);
  }





  //________________________________________________ Experimento _______________________________________

  //Cargar Experimento
  async cargarExperimentos(idTema){
    return this.http.get(`${this.URL}/cargarExperimentos/${idTema}`);
  }

  //Cargar Un Experimento
  async cargarUnExperimento(idExperimento){
    return this.http.get(`${this.URL}/cargarUnExperimento/${idExperimento}`);
  }




  //________________________________________________ Practica _______________________________________

  //Guarda practica
  async guardarExperimentoEstudiante(practica) {
    return this.http.post(this.URL + '/guardarExperimentoEstudiante', practica, { responseType: 'text' });
  }

  //Cargar practicas
  async cargarPracticas(idExperimento) {
    return this.http.get(`${this.URL}/cargarPracticas/${idExperimento}`);  
  }


   //Cargar una sola practicas
   async cargarUnaPractica(idExperimento) {
    return this.http.get(`${this.URL}/cargarUnaPractica/${idExperimento}`);  
  }



}
