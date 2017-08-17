import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataService } from './app.service';
import { AppComponent } from './app.component';
import { ValuesPipe } from './app.filter';

@NgModule({
  declarations: [
    AppComponent,
    ValuesPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
  }
}
