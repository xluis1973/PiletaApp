import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';
import { UIServiceService } from './uiservice.service';

const URL:string=environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _storage: Storage | null = null;
   token:string=null;
  private usuario:Usuario={};

  constructor(private http:HttpClient,private storage:Storage,
    private navCtrl:NavController) { 
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.token=null;
    this.usuario=null;
   
   
  }

   //Obtener el token y alamacenarlo
 obtenerToken(email:string,password:string){
  // const data={Usuario:email, Clave:password};
  const body = new HttpParams()
  .set('email', email)
  .set('password', password);
//const headers = { 'content-type': 'application/json'}; 
   //Después vamos a definir la url base en una variable de environment.

 return new Promise(resolve=>{

  this._storage?.clear();
   this.http.post(`${URL}/api/usuarios/login`,body,{'responseType':'json'})
 
    .subscribe( 
     resp=>{
      if(resp['ok']){

        this.guardarToken(resp['token']);
        console.log("resupuesta ",resp)
        resolve(true);
      }else {
       
          this.token=null;
          this._storage?.clear();
        resolve(false);
    
    

     }}
   ,error=>{
     resolve(false);
     this.token=null;
     this._storage?.clear();
     console.log(error);
     

   });
  

 });
 

}

logout(){

  this.token=null;
this.usuario=null;
this.storage.clear();
this.navCtrl.navigateRoot('/login',{animated:true});

}
async guardarToken(token:string){

  this.token=token;
console.log("token guardado",this.token);
await this._storage?.set('token', token);
}

async cargarToken(){
  this.token= await this.storage.get('token') ||null ;
}
async obtenerUsuario():Promise<boolean>{

if(!this.token) {await this.cargarToken();}

if (!this.token){
this.navCtrl.navigateRoot('/login');
return Promise.resolve(false);
}
return new Promise(resolve=>{

  const headers=new HttpHeaders({

    'x-token':this.token
  });

console.log("token recuperado ",this.token);
console.log('token header ',headers.get('x-token'));

this.http.get(`${URL}/api/usuarios/find`,{headers})
.subscribe(resp=>{

   resolve(true);
   this.usuario=resp;
   console.log(resp);
   console.log(this.usuario.id);

},

error=>{
 resolve(false);
 this.navCtrl.navigateRoot('/login');
 

}
)


});

}

async getUsuario(){
if(!this.usuario){
await this.obtenerUsuario();

}
return {...this.usuario};
}

async actualizarPerfil(usuario:Usuario){


await this.cargarToken();

if (!this.token){
this.navCtrl.navigateRoot('/login');
return Promise.resolve(false);
}
return new Promise(resolve=>{

const headers=new HttpHeaders({
'x-token':this.token
});

console.log(headers.get('x-token'));

this.http.post(`${URL}api/usuarios`,usuario,{headers})
.subscribe(resp=>{

   resolve(true);
   this.usuario=resp;
   console.log(resp);
   console.log(this.usuario.id);

},

error=>{
 resolve(false);
 this.navCtrl.navigateRoot('/login');
 

}
)


});

}

}
