import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularPage } from './anular.page';

const routes: Routes = [
  {
    path: '',
    component: AnularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularPageRoutingModule {}
