import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TitularService } from '../../services/titular.service';
import { FamiliarService } from '../../services/familiar.service';
import { UIServiceService } from 'src/app/services/uiservice.service';

@Component({
  selector: 'app-anular',
  templateUrl: './anular.page.html',
  styleUrls: ['./anular.page.scss'],
})
export class AnularPage implements OnInit {
  nroAfiliado:number=0;
  dni:number=0;

  constructor(private titularSrv:TitularService, private familiarSrv:FamiliarService,
    private uiSrv:UIServiceService) { }

  ngOnInit() {
  }


  borrarTitular(formulario:NgForm){

    if(!formulario.valid){
      return;
    }

    this.titularSrv.borrarTitularPorNro(this.nroAfiliado).subscribe(resp=>{
      if(resp > 0){
        console.log("Borrado ",resp);
        this.uiSrv.alertaInformativa("Titular y Grupo borrado exitosamente!!!");
      }
    },err=>{
      this.uiSrv.alertaInformativa("No existe Titular con ese nro.");
    });

  }

  borrarFamiliar(formulario:NgForm){

    if(!formulario.valid){
      return;
    }

    this.familiarSrv.borrarFamiliarPorNro(this.nroAfiliado,this.dni).subscribe(resp=>{
      if(resp > 0){
        this.uiSrv.alertaInformativa("Familiar Borrado Exitosamente!!!");
      }
    },err=>{
      this.uiSrv.alertaInformativa("No existen datos");
    });
 

  }

}
