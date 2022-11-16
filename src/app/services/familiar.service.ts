import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Familiar } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

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

    return this.http.post('http://localhost:3000/api/familiares/create',familiar,{headers});
    
  }

  buscarFamiliaresPorNro(nro:number){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token,
      
    });
 
 
    


    return this.http.get('http://localhost:3000/api/familiares/porAfiliado?nroAfiliado='+nro,{headers:headers});
  }

  actualizarFamiliar(familiar:Familiar){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    return this.http.put('http://localhost:3000/api/familiares/update',familiar,{headers});
    
  }
}
