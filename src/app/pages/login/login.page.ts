import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UIServiceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUser={
    email:'mercado@mail.com',
    password:'123'
  };

  constructor(private navCtrl:NavController, private usuarioSrv:UsuarioService,
    private uiSrv:UIServiceService) { }

  ngOnInit() {
  }

  async login(flogin:NgForm){
    if(flogin.invalid){
      return;
    }
    this.navCtrl.navigateRoot('/menu',{animated:true});
     
     const valido= await this.usuarioSrv.obtenerToken(this.loginUser.email,this.loginUser.password);
     if(valido){
       //Navegar al menú 
       this.navCtrl.navigateRoot('/menu',{animated:true});
     }else {
         //mostrar alerta
        this.uiSrv.alertaInformativa("Usuario y/o Contraseña Incorrecta");
        console.log("errorororor");
       
     }
 }

}
