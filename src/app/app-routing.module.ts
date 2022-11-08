import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'generar',
    loadChildren: () => import('./pages/generar/generar.module').then( m => m.GenerarPageModule)
  },  {
    path: 'empresa',
    loadChildren: () => import('./pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'imprimir',
    loadChildren: () => import('./pages/imprimir/imprimir.module').then( m => m.ImprimirPageModule)
  },
  {
    path: 'anular',
    loadChildren: () => import('./pages/anular/anular.module').then( m => m.AnularPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
