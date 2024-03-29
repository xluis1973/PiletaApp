import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {WebcamModule} from 'ngx-webcam';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';





@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PipesModule,IonicModule.forRoot(), AppRoutingModule,WebcamModule,IonicStorageModule.forRoot(),HttpClientModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
