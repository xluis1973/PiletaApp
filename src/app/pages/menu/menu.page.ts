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
    
  }

}
