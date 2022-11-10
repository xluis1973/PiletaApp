import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/interfaces/interfaces';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  empresa:Empresa={
    nroEmpresa:0,
    razonSocial:""
  }
  constructor(private empresaSrv:EmpresaService) { }

  ngOnInit() {
    this.empresaSrv.empresasAll().then(resp=>{
      console.log(resp);
    })
  }

  guardar(formulario:NgForm){

    if(formulario.invalid ){
       return;
     }
    }

}
