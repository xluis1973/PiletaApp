import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
})
export class GenerarPage implements OnInit {

  usuario={
    identificador:"",
    apellido:"",
    nombre:"",
    domicilio:"", 
    ciudad:"",
    telefono:"",
    activo:true  };

  guia={
    identificador:"",
    usuario: "",
    cuil: "",
    nroHabiliatacion:-1,
    fHabilitacion: null,
    vtoHabilitacion:null,
    email:"",
    password:""
  };
  constructor() { }

  ngOnInit() {
  }
  guardar(formulario:NgForm){}
  
}
