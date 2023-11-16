import { Pipe, PipeTransform } from '@angular/core';
import { Empresa } from '../interfaces/interfaces';

@Pipe({
  name: 'filtro'
})

export class FiltroPipe implements PipeTransform {

  transform(arreglo:Empresa[], texto:string): Empresa[] {
    if(texto ===''){
      return arreglo; 
    }
   return arreglo.filter(empresa=>{
      return empresa.razonSocial.toLocaleLowerCase().startsWith(texto.toLocaleLowerCase());
    });
   
  }

}
