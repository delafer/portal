import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoaderComponent } from './components';
import { Nl2brPipe } from './pipes';
import { LoadScriptDirective } from './directives/load-script.directive';
import { HoverDirective } from './directives/hover.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SharedModule { }
