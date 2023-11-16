import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';




@NgModule({
  declarations: [FiltroPipe],
  exports:[FiltroPipe],
  imports:[]

})
export class PipesModule { }
