import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Familiar } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment.prod';
const URL=environment.url;
@Injectable({
  providedIn: 'root'
})
export class FamiliarService {

  constructor(private http:HttpClient, private usuarioSrv:UsuarioService) {   }


   

  crearFamiliar(familiar:Familiar){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    return this.http.post(`${URL}/api/familiares/create`,familiar,{headers});
    
  }

  buscarFamiliaresPorNro(nro:number){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token,
      
    });
 
 
    


    return this.http.get(`${URL}/api/familiares/porAfiliado?nroAfiliado=`+nro,{headers:headers});
  }

  actualizarFamiliar(familiar:Familiar){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    return this.http.put(`${URL}/api/familiares/update`,familiar,{headers});
    
  }

  borrarFamiliarPorNro(nro:number,doc:number){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token,
      
    });
 
 
    


    return this.http.get(`${URL}/api/familiares/borrar?nroAfiliado=`+nro+"&dni="+doc,{headers:headers});
  }
}
