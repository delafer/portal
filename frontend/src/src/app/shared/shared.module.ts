import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoaderComponent } from './components';
import { Nl2brPipe } from './pipes';
import { LoadScriptDirective } from './directives/load-script.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent, Nl2brPipe, LoadScriptDirective
  ],
  exports: [
    LoaderComponent, Nl2brPipe
  ]
})
export class SharedModule { }
