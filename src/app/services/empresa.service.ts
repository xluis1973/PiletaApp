import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment.prod';
const URL=environment.url;
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
      
       return this.http.get(`${URL}/api/empresas/all`,{headers});
     
       

  }

  crearEmpresa(empresa:Empresa){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    return this.http.post(`${URL}/api/empresas/create`,empresa,{headers});
    
  }

  empresasPorNro(nro:number){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    return this.http.get(`${URL}/api/empresas/porNro?nroEmpresa=`+nro,{headers});
    

  }

  actualizarEmpresa(empresa:Empresa){
    this.usuarioSrv.cargarToken();

    const headers=new HttpHeaders({

      'x-token':this.usuarioSrv.token
    });

    console.log("Empresa Actualizada ",empresa);
    return this.http.put(`${URL}/api/empresas/update`,empresa,{headers});
  }
}
