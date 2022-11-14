import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { TitularService } from 'src/app/services/titular.service';
import { UIServiceService } from 'src/app/services/uiservice.service';

import { Titular, Familiar, Empresa } from '../../interfaces/interfaces';
import { EmpresaService } from '../../services/empresa.service';

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
    foto:""  };

  familiar:Familiar={
    dni:0,
    apellido:"",
    nombre:"",
    fechaNacimiento:null,
    parentesco:"",
    nroAfiliado:0,
    foto:""

  };
  public lista:Titular[]=[];
  public listaFamiliares:Familiar[]=[]
  public noHayTitular:boolean=true;
  public noHayFamiliar:boolean=false;
  constructor(private titularSrv:TitularService,private uiSrv:UIServiceService, private EmpresaSrv:EmpresaService) { }

  listaEmpresas:Empresa[]=[];
  ngOnInit() {
    this.EmpresaSrv.empresasAll().subscribe((resp:any)=>{

      this.listaEmpresas=resp;
      console.log(this.listaEmpresas);
    });
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
    console.log("Valido");
    //Tengo los datos de un titular.
    this.titular.foto=this.webcamImage.imageAsBase64;
    this.titular.fotoMostrar=this.webcamImage.imageAsDataUrl;
    this.familiar.nroAfiliado=this.titular.nroAfiliado;
    
    this.lista.push(this.titular);
    this.titularSrv.crearTitular(this.titular).subscribe(resp=>{
      if(resp){

         this.uiSrv.presentToast("Titular Guardado");
      }
    },(err)=>{
      this.uiSrv.presentToast("No se pudo agregar titular");
    })

    //Blanqueo Titular
    this.titular={
      nroAfiliado:0,
      dni:0,
      nroEmpresa:0,
      apellido:"",
      nombre:"",
      fechaNacimiento: null,
      foto:""  };


      this.webcamImage=null;
      this.noHayTitular=false;
      this.noHayFamiliar=true;

  }

  guardarFamiliar(formulario:NgForm){
    if(formulario.invalid || !this.webcamImage){
      return;
    }
    this.familiar.foto=this.webcamImage.imageAsDataUrl;
    this.listaFamiliares.push(this.familiar);
    console.log(this.familiar);
    

this.familiar={
    dni:0,
    apellido:"",
    nombre:"",
    fechaNacimiento:null,
    parentesco:"",
    nroAfiliado:this.titular.nroAfiliado,
    foto:""

  };
  this.webcamImage=null;
  }
}
