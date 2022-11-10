import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient, private usuarioSrv:UsuarioService) {   }


   empresasAll(){
     this.usuarioSrv.cargarToken();

   

    console.log("token para empresas ",this.usuarioSrv.token);
      const headers=new HttpHeaders({

        'x-token':this.usuarioSrv.token
      });
      
       return this.http.get('http://localhost:3000/api/empresas/all',{headers});
     
       

  }

  crearEmpresa(empresa:Empresa){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    return this.http.post('http://localhost:3000/api/empresas/create',empresa,{headers});
    
  }
}
