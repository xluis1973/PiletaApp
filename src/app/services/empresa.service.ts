import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient, private usuarioSrv:UsuarioService) {   }


  async empresasAll(){
    await this.usuarioSrv.cargarToken();

   

      const headers=new HttpHeaders({

        'x-token':this.usuarioSrv.token
      });
      
       return this.http.get('http://localhost:3000/api/empresas/all',{headers});
     
       

  }
}
