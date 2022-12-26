import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Titular } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';
const URL=environment.url;
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

    return this.http.post(`${URL}/api/titulares/create`,titular,{headers});
    
  }

  buscarAfiliadoPorNro(nro:number){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token,
      
    });
 
 
    


    return this.http.get(`${URL}/api/titulares/porNro?nroAfiliado=`+nro,{headers:headers});
  }

  actualizarTitular(titular:Titular){

    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    console.log("Titular Actualizado ",titular);
    return this.http.put(`${URL}/api/titulares/update`,titular,{headers});
  }


  borrarTitularPorNro(nro:number){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token,
      
    });
 
 
    


    return this.http.get(`${URL}/api/titulares/borrar?nroAfiliado=`+nro,{headers:headers});
  }
}
