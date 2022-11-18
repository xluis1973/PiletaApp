import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private usuarioSrv:UsuarioService) { }

  usuario:Usuario={}
   async ngOnInit() {
    this.usuarioSrv.getUsuario().then(resp=>{
      this.usuario=resp;
    });
    const constraints = {
      audio: true,
      video: {
        width: 1280, height: 720
      }
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
    } catch (e) {
      
    }
    
  }

}
