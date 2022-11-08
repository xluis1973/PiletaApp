import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularPageRoutingModule } from './anular-routing.module';

import { AnularPage } from './anular.page';
import { ComponentsModule } from '../../components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AnularPage]
})
export class AnularPageModule {}
