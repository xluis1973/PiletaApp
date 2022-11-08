import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprimirPageRoutingModule } from './imprimir-routing.module';

import { ImprimirPage } from './imprimir.page';
import { ComponentsModule } from 'src/app/components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprimirPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ImprimirPage]
})
export class ImprimirPageModule {}
