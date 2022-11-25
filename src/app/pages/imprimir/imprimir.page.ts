import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TitularService } from '../../services/titular.service';
import { Titular, Empresa, Familiar } from '../../interfaces/interfaces';
import { FamiliarService } from '../../services/familiar.service';
import { EmpresaService } from '../../services/empresa.service';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { UIServiceService } from '../../services/uiservice.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const URL=environment.url;
@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.page.html',
  styleUrls: ['./imprimir.page.scss'],
})
export class ImprimirPage implements OnInit {

  pdfOject:any;
  private titular:Titular;
  private listaEmpresas:Empresa[]=[];
  private familiares:Familiar[]=[];
  activarBotonTitular=true;
  activarBoton=true;
  contador=0;
  nroAfiliado:number=0;
  constructor(private titularSrv:TitularService,private familiarSrv:FamiliarService
    ,private empresaSrv:EmpresaService, private uiS:UIServiceService) { }

  ngOnInit() {
    this.empresaSrv.empresasAll().subscribe((resp:Empresa[])=>{

      this.listaEmpresas=resp;
    });
   //this.traerTitular(7231);
   
  }


  traerTitular(nro:number){

    try{

      this.titularSrv.buscarAfiliadoPorNro(nro).subscribe((resp:Titular)=>{
        if(resp.nroAfiliado){
          this.titular=resp;
          this.titular.empresa=this.listaEmpresas.find(cod=>{
            console.log("Buscando empresa ",this.titular.nroEmpresa);
            if(cod.nroEmpresa==this.titular.nroEmpresa){return cod;}else {return null;}
          });
          this.activarBotonTitular=false;
          
        }else{
          this.uiS.alertaInformativa("No Existe Titular con ese nro de afiliado");
        }
      },error=>{
        this.uiS.alertaInformativa("No Existe Titular con ese nro de afiliado");
      });
    }catch(error){

      console.log("Error al traer afiliado titular ",error);
    }
    

  }

  traerFamiliares(nro:number){

    try{
    this.familiarSrv.buscarFamiliaresPorNro(nro).subscribe((resp:Familiar[])=>{
      if(resp){
        this.familiares=resp;
        
         this.familiares.forEach( (element:Familiar) => {
           this.getBase64ImageFromURL(`${URL}`+element.foto).then(resp=>{

            

              this.contador++;
              element.fotoCarnet=resp;
              console.log("contadores ",this.contador+" "+this.familiares.length)
              if(this.contador==this.familiares.length){
               this.activarBoton=false;
              }


           
            
           });
        });
        
      }


    });
  }catch(error){

    
        this.uiS.alertaInformativa("No tiene familiares");
    console.log("No tiene familiares",error);
  }


  }
  async generarPDF(){
   

    var tabla={
      content:[
        {
          table:{

            widths: ['50%','25%','25%'],
            
            body:[
              [
                {text:'Sindicato Empleados de Comercio', fontSize:12, alignment: 'center', italics:'Helvetica-Oblique', width:'*'},
                {},
                {text:'Vencimiento', fontSize:14, alignment: 'center',bold : true, width:'*'}

              ],
              [
                
                {text:'Villa Deportiva 26 de Septiembre 2022-2023', fontSize:10, alignment: 'center',bold : true, width:'*'},
                {},
                {}

              ],

              [
                {
                  // you can also fit the image inside a rectangle
                  image: await this.getBase64ImageFromURL(`${URL}`+this.titular.foto),
                  fit: [100, 100],
                  alignment: 'center'
                },
                {},
                {}
                      
               
              ],
              [
                {
                  text:this.titular.apellido+", "+this.titular.nombre+" Tel: "+this.titular.telefono,  fontSize:10
                }
                ,{},
                {}
              ],[
                {text:"Nro de Afiliado: "+this.titular.nroAfiliado , fontSize:10} ,
                {},
                {}
              ],
              [{
                text:this.titular.empresa.razonSocial, fontSize:10
              },
              {
                text: "Firma Autorizada", alignment: 'center',bold : true, fontSize:10
              },
              {
                text: "Ctrl. Enfermería", alignment: 'center',bold : true, fontSize:10
              }

              ]
            
            ]
            
          },
          layout: {
            
            
            hLineColor: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 'red' : 'white';
            },
            vLineColor: function(i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'red' : 'blue';
            }
        }
        }
      ]
     

    }

    this.pdfOject=pdfMake.createPdf(tabla);
    this.pdfOject.open();
    


  }

   generarPDFFamiliares(){

    var tablas:any[]=[];
     this.familiares.forEach( familiar=>{
      tablas.push({
        margin: [-5,15,-5,-3],
        table:{

          widths: ['50%','25%','25%'],
          
          body:[
            [
              {text:'Sindicato Empleados de Comercio', fontSize:12, alignment: 'center', italics:'Helvetica-Oblique', width:'*'},
              {},
              {text:'Vencimiento', fontSize:14, alignment: 'center',bold : true, width:'*'}

            ],
            [
              
              {text:'Villa Deportiva 26 de Septiembre 2022-2023', fontSize:10, alignment: 'center',bold : true, width:'*'},
              {},
              {}

            ],

            [
              {
                // you can also fit the image inside a rectangle
                image: familiar.fotoCarnet,
                fit: [100, 100],
                alignment: 'center'
              },
              {},
              {}
                    
             
            ],
            [
              {
                text:familiar.apellido+", "+familiar.nombre+" Tel. "+familiar.telefono,  fontSize:10
              }
              ,{},
              {}
            ],[
              {text:"Nro de Afiliado: "+familiar.nroAfiliado , fontSize:10} ,
              {},
              {}
            ],
            [{
              text:familiar.parentesco, fontSize:10
            },
            {
              text: "Firma Autorizada", alignment: 'center',bold : true, fontSize:10
            },
            {
              text: "Ctrl. Enfermería", alignment: 'center',bold : true, fontSize:10
            }

            ]
          
          ]
          
        },
        layout: {
          
          
          hLineColor: function(i, node) {
              return (i === 0 || i === node.table.body.length) ? 'red' : 'white';
          },
          vLineColor: function(i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'red' : 'blue';
          }
      }
      });

    });
    console.log("En formato json",JSON.stringify(tablas));
    console.log("largo ",tablas.length);
    
    var tabla={
      content:[
        
        tablas
  ]
  };
    console.log("familires ",this.familiares);
    console.log("tablas ",tablas);

    this.pdfOject=pdfMake.createPdf(tabla);
    this.pdfOject.open();
    console.log("En formato json",JSON.stringify(this.familiares));
    console.log("largo ",tablas.length);
    


  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

 empezar(formulario:NgForm){

  if(!formulario.valid){
    return;
  }

  this.traerTitular(this.nroAfiliado);
  this.traerFamiliares(this.nroAfiliado);

 }
 imprimirTitular(){

 this.generarPDF();
  }

  imprimirFamiliar(){
    this.generarPDFFamiliares();
  }

  limpiar(){
    this.activarBoton=true;
    this.activarBotonTitular=true;
    this.contador=0;
  }
}
