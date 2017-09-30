import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdCardModule,
  MdListModule,
  MdInputModule,
  MdCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdListModule,
    MdCheckboxModule
  ],
  declarations: []
})
export class MaterialModuleModule { }
