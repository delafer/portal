import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoaderComponent } from './components';
import { Nl2brPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent, Nl2brPipe
  ],
  exports: [
    LoaderComponent, Nl2brPipe
  ]
})
export class SharedModule { }
