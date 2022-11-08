import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarPageRoutingModule } from './generar-routing.module';

import { GenerarPage } from './generar.page';
import { ComponentsModule } from '../../components/components/components.module';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarPageRoutingModule,
    ComponentsModule,
    WebcamModule
  ],
  declarations: [GenerarPage]
})
export class GenerarPageModule {}
