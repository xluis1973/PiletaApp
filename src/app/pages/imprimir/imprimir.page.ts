import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TitularService } from '../../services/titular.service';
import { Titular, Empresa } from '../../interfaces/interfaces';
import { FamiliarService } from '../../services/familiar.service';
import { EmpresaService } from '../../services/empresa.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.page.html',
  styleUrls: ['./imprimir.page.scss'],
})
export class ImprimirPage implements OnInit {

  pdfOject:any;
  private titular:Titular;
  private listaEmpresas:Empresa[]=[];

  constructor(private titularSrv:TitularService,private familiarSrv:FamiliarService,private empresaSrv:EmpresaService) { }

  ngOnInit() {
    this.empresaSrv.empresasAll().subscribe((resp:Empresa[])=>{

      this.listaEmpresas=resp;
    });
   this.traerTitular(7231);
  }

  traerTitular(nro:number){

    try{

      this.titularSrv.buscarAfiliadoPorNro(nro).subscribe((resp:Titular)=>{
        if(resp){
          this.titular=resp;
          this.titular.empresa=this.listaEmpresas.find(cod=>{
            console.log("Buscando empresa ",this.titular.nroEmpresa);
            if(cod.nroEmpresa==this.titular.nroEmpresa){return cod;}else {return null;}
          });
          this.generarPDF();
        }
      });
    }catch(error){

      console.log("Error al traer afiliado titular ",error);
    }
    

  }
  async generarPDF(){
    var dd = {
      content: [
          {
              style: 'tableExample',
              color: '#555',
              table: {
                  body: [
                      [
                          {
                               text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a pharetra odio.\n\nVestibulum erat mauris, sodales et consequat sit amet, ultricies vitae erat. Etiam feugiat orci justo, ultrices malesuada dui ornare ac.'
                          } 
                      ],
                      [
                          {
                               text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a pharetra odio.\n\nVestibulum erat mauris, sodales et consequat sit amet, ultricies vitae erat. Etiam feugiat orci justo, ultrices malesuada dui ornare ac.'
                          } 
                      ],
                      [
                          {
                               text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a pharetra odio.\n\nVestibulum erat mauris, sodales et consequat sit amet, ultricies vitae erat. Etiam feugiat orci justo, ultrices malesuada dui ornare ac.'
                          } 
                      ],
                  ]
              },
              layout: {
                  //hLineWidth: function(i, node) {
                  //  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                  //},
                  //vLineWidth: function(i, node) {
                  //  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                  //},
                  hLineColor: function(i, node) {
                      return (i === 0 || i === node.table.body.length) ? 'red' : 'blue';
                  },
                  vLineColor: function(i, node) {
                      return (i === 0 || i === node.table.widths.length) ? 'red' : 'blue';
                  },
                  paddingLeft: function(i, node) { return 40; },
                  paddingRight: function(i, node) { return 40; },
                  paddingTop: function(i, node) { return 20; },
                  paddingBottom: function(i, node) { return 20; }
              }
          }
      ],
  
      defaultStyle: {
          alignment: 'justify'
      }
  
  };

    var tabla={
      content:[
        {
          table:{

            widths: ['50%','25%','25%'],
            
            body:[
              [
                {text:'Sindicato Empleados de Comercio', fontSize:14, alignment: 'center', italics:'Helvetica-Oblique', width:'*'},
                {},
                {text:'Vencimiento', fontSize:14, alignment: 'center',bold : true, width:'*'}

              ],
              [
                
                {text:'Villa Deportiva 26 de Septiembre', fontSize:12, alignment: 'center',bold : true, width:'*'},
                {},
                {}

              ],

              [
                {
                  // you can also fit the image inside a rectangle
                  image: await this.getBase64ImageFromURL("http://localhost:3000"+this.titular.foto),
                  fit: [100, 100],
                  alignment: 'center'
                },
                {},
                {}
                      
               
              ],
              [
                {
                  text:this.titular.apellido+", "+this.titular.nombre,  fontSize:10
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
            
            //hLineWidth: function(i, node) {
            //  return (i === 0 || i === node.table.body.length) ? 2 : 1;
            //},
            //vLineWidth: function(i, node) {
            //  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            //},
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
}
