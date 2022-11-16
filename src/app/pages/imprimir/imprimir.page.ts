import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.page.html',
  styleUrls: ['./imprimir.page.scss'],
})
export class ImprimirPage implements OnInit {

  pdfOject:any;
  constructor() { }

  ngOnInit() {
    this.generarPDF();
  }

  generarPDF(){
    var dd = {
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ]
      
    };

    const dato1:string[]=['DATO1','DATO2','DATO3'];
    var tabla={
      content:[
        {
          table:{
            whidths:['*',200,'auto'],
            body:[
              [
                'titulo1',
                'titulo2',
                'titulo3'
              ]
              ,
              dato1

            ]
          }
        }
      ]

    }

    this.pdfOject=pdfMake.createPdf(tabla);
    this.pdfOject.open();
    


  }
}
