import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { TitularService } from 'src/app/services/titular.service';
import { UIServiceService } from 'src/app/services/uiservice.service';

import { Titular, Familiar, Empresa } from '../../interfaces/interfaces';
import { EmpresaService } from '../../services/empresa.service';
import { FamiliarService } from '../../services/familiar.service';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
})
export class GenerarPage implements OnInit {

  titular:Titular={
    nroAfiliado:0,
    dni:0,
    nroEmpresa:0,
    apellido:"",
    nombre:"",
    fechaNacimiento: null,
    foto:"",
    estado:true  };

  familiar:Familiar={
    dni:0,
    apellido:"",
    nombre:"",
    fechaNacimiento:null,
    parentesco:"",
    nroAfiliado:0,
    foto:"",
    estado:true

  };
  public lista:Titular[]=[];
  public listaFamiliares:Familiar[]=[]
  public noHayTitular:boolean=true;
  public noHayFamiliar:boolean=false;
  public fondo:string="custom-bg";
  public textoTitular:string="Registar Titular";
  public textoFamiliar:string="Registrar Familiar";
  public encontroAfiliado:boolean=false;

  constructor(private titularSrv:TitularService,private uiSrv:UIServiceService, 
    private EmpresaSrv:EmpresaService, private familiarSrv:FamiliarService) { }

  listaEmpresas:Empresa[]=[];
  ngOnInit() {
    this.EmpresaSrv.empresasAll().subscribe((resp:any)=>{

      this.listaEmpresas=resp;
      console.log("listado",this.listaEmpresas);
    });
  this.limpiarCampos();
  }
 
  
  title = 'gfgangularwebcam';
  
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
   this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
   console.info('Saved webcam image', webcamImage);
   this.webcamImage = webcamImage;
  }
   
  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
  }

  
  guardar(formulario:NgForm){

   if(formulario.invalid || !this.webcamImage){
      return;
    }
    console.log("Valido ",formulario);
    if(this.textoTitular=="Registar Titular"){
    //Tengo los datos de un titular.
    this.titular.foto=this.webcamImage.imageAsBase64;
    this.titular.fotoMostrar=this.webcamImage.imageAsDataUrl;
    this.familiar.nroAfiliado=this.titular.nroAfiliado;
    
    this.titular.estado=true;
    this.titular.empresa=this.listaEmpresas.find(cod=>{
      console.log("Buscando empresa ",this.titular.nroEmpresa);
      if(cod.nroEmpresa==this.titular.nroEmpresa){return cod;}else {return null;}
    });
    console.log("Encontrado ",this.titular.empresa);
    this.lista.push(this.titular);
    this.titularSrv.crearTitular(this.titular).subscribe(resp=>{
      if(resp){

         this.uiSrv.presentToast("Titular Guardado");
      }
    },(err)=>{
      this.uiSrv.presentToast("No se pudo agregar titular");
    });

    //Blanqueo Titular
    


      this.webcamImage=null;
      this.noHayTitular=false;
      this.noHayFamiliar=true;
      this.fondo="custom-bg-familiar";

  }else {

    this.titular.foto=this.webcamImage.imageAsBase64;
    this.titular.fotoMostrar=this.webcamImage.imageAsDataUrl;
    this.familiar.nroAfiliado=this.titular.nroAfiliado;
    
    this.titular.estado=true;
    this.titular.empresa=this.listaEmpresas.find(cod=>{
      console.log("Buscando empresa ",this.titular.nroEmpresa);
      if(cod.nroEmpresa==this.titular.nroEmpresa){return cod;}else {return null;}
    });
    console.log("Encontrado ",this.titular.empresa);
    this.lista=[];
    this.lista.push(this.titular);

    //Proceso de modificar titular.

    this.titularSrv.actualizarTitular(this.titular).subscribe(resp=>{
      if(resp){

         this.uiSrv.presentToast("Titular Actualizado");
      }
    },(err)=>{
      this.uiSrv.presentToast("No se pudo Actualizar titular");
    });
  }
  }

  guardarFamiliar(formulario:NgForm){
    console.log("Guardando familiar");
    
    if(formulario.invalid || !this.webcamImage){
      return;
    }
    if(this.textoFamiliar=="Registrar Familiar"){
    this.familiar.foto=this.webcamImage.imageAsBase64;
    this.familiar.fotoMostrar=this.webcamImage.imageAsDataUrl;
    this.listaFamiliares.push(this.familiar);

    this.familiarSrv.crearFamiliar(this.familiar).subscribe(resp=>{
      if(resp){
        this.uiSrv.alertaInformativa("Familiar Guardado");
      }else {
        this.uiSrv.alertaInformativa("No se pudo guardar familiar");
      }
    });

    console.log(this.familiar);
    
//Blanqueo Familiar
this.familiar={
    dni:0,
    apellido:"",
    nombre:"",
    fechaNacimiento:null,
    parentesco:"",
    nroAfiliado:this.titular.nroAfiliado,
    foto:"",
    fotoMostrar:"",
    estado:true

  };
  this.webcamImage=null;
}else{

  this.familiar.foto=this.webcamImage.imageAsBase64;
  this.familiar.fotoMostrar=this.webcamImage.imageAsDataUrl;
  this.listaFamiliares.push(this.familiar);

  this.familiarSrv.actualizarFamiliar(this.familiar).subscribe(resp=>{
    if(resp){
      this.uiSrv.alertaInformativa("Familiar Actualizado");
    }else {
      this.uiSrv.alertaInformativa("No se pudo actualizar familiar");
    }
  });

  console.log(this.familiar);
  
//Blanqueo Familiar
this.familiar={
  dni:0,
  apellido:"",
  nombre:"",
  fechaNacimiento:null,
  parentesco:"",
  nroAfiliado:this.titular.nroAfiliado,
  foto:"",
  fotoMostrar:"",
  estado:true

};
this.webcamImage=null;

}
  }

  limpiarCampos(){
    this.encontroAfiliado=false;
    this.titular={
      nroAfiliado:0,
      dni:0,
      nroEmpresa:0,
      apellido:"",
      nombre:"",
      fechaNacimiento: null,
      foto:"",
      fotoMostrar:"",
      estado:true  };
 

  this.familiar={
    dni:0,
    apellido:"",
    nombre:"",
    fechaNacimiento:null,
    parentesco:"",
    nroAfiliado:this.titular.nroAfiliado,
    foto:"",
    fotoMostrar:"",
    estado:true

  };

  this.lista=[];
  this.listaFamiliares=[]
  this.noHayTitular=true;
  this.noHayFamiliar=false;
  this.fondo="custom-bg";
  this.textoTitular="Registar Titular";
  this.textoFamiliar="Registrar Familiar";

}

buscarAfiliado(){
  console.log("Nro de afiliado ",this.titular.nroAfiliado);
  try{
  this.titularSrv.buscarAfiliadoPorNro(this.titular.nroAfiliado).subscribe((resp:Titular)=>{


    console.log("Por nro",resp);
    resp.fotoMostrar="http://localhost:3000/"+resp.foto;
    resp.empresa=this.listaEmpresas.find(cod=>{
      if(cod.nroEmpresa==resp.nroEmpresa){return cod;}else {return null;}
    });
    this.titular=resp;
    this.lista.push(this.titular);
    this.textoTitular="Modificar Titular";
    this.encontroAfiliado=true;
  });
}catch(error){
    console.log("sigo");
    
  };
  this.familiarSrv.buscarFamiliaresPorNro(this.titular.nroAfiliado).subscribe((resp:Familiar[])=>{

    resp.forEach(familia=>{

      familia.fotoMostrar="http://localhost:3000/"+familia.foto;
      this.listaFamiliares.push(familia);
    });

  });
}

nuevoFamiliar(){
  this.familiar.nroAfiliado=this.titular.nroAfiliado;
  this.webcamImage=null;
      this.noHayTitular=false;
      this.noHayFamiliar=true;
      this.fondo="custom-bg-familiar";


}

familiarElegido(indice:number){

  this.familiar=this.listaFamiliares[indice];
  this.listaFamiliares=this.listaFamiliares.filter(elem=>elem.dni!=this.familiar.dni);
  console.log("familiar elegido "+this.familiar.nombre);
  console.log("indice ",indice);
  this.textoFamiliar="Modificar Titular"
  this.webcamImage=null;
      this.noHayTitular=false;
      this.noHayFamiliar=true;
      this.fondo="custom-bg-familiar";

}
}
