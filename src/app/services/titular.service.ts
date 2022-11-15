import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Titular } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TitularService {

  constructor(private http:HttpClient, private usuarioSrv:UsuarioService) {   }


   

  crearTitular(titular:Titular){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    return this.http.post('http://localhost:3000/api/titulares/create',titular,{headers});
    
  }

  buscarAfiliadoPorNro(nro:number){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token,
      
    });
 
 
    


    return this.http.get('http://localhost:3000/api/titulares/porNro?nroAfiliado='+nro,{headers:headers});
  }
}
