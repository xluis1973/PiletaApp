import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/interfaces/interfaces';
import { EmpresaService } from '../../services/empresa.service';
import { UIServiceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  empresa:Empresa={
    nroEmpresa:0,
    razonSocial:"",
    estado:true
  }
  constructor(private empresaSrv:EmpresaService, private uiSrv:UIServiceService) { }

    ngOnInit() {
    this.empresaSrv.empresasAll().subscribe( resp=>{
      console.log(resp);
    });
    
    /*((resp:any)=>{
      console.log(resp.empresas);
    }).catch(
      (err)=>{
        console.log("error en empresa ",err);
      }
    );*/
  }

  guardar(formulario:NgForm){

    if(formulario.invalid ){
       return;
     }
     this.empresaSrv.crearEmpresa(this.empresa).subscribe((resp:any)=>{

      
       
          this.uiSrv.presentToast("Empresa Agredada");
          this.empresa.nroEmpresa=0;
          this.empresa.razonSocial="";

     },(err)=>{

      this.uiSrv.presentToast("Ya existe una empresa con ese nro");
      this.empresa.nroEmpresa=0;
      this.empresa.razonSocial="";
     });
    }

}
