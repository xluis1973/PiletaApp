import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarPageRoutingModule } from './generar-routing.module';

import { GenerarPage } from './generar.page';
import { ComponentsModule } from '../../components/components/components.module';
import { WebcamModule } from 'ngx-webcam';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarPageRoutingModule,
    ComponentsModule,
    WebcamModule,
    PipesModule,
    
  ],
  declarations: [GenerarPage]
})
export class GenerarPageModule {}
