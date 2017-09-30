import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import * as firebase from 'firebase'

import { IDataStore } from './IDataStore';
import { KFStoreService } from './kfstore';
import { FirebaseStoreService } from './firebasestore';
import { AppComponent } from './app.component';
import { ValuesPipe } from './app.filter';
import { MaterialModuleModule } from './shared';
import { environment } from '../environments/environment'

function storeServiceFactory(){
  if(environment.storage == "firebase") return new FirebaseStoreService();
  return new KFStoreService()
}

@NgModule({
  declarations: [
    AppComponent,
    ValuesPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MaterialModuleModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'IDataStore',
      useFactory: storeServiceFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject('IDataStore')private store: IDataStore){
    this.store.init();
  }
}
