import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { UnsanitizeComponent } from './unsanitize.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    UnsanitizeComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class ComponentsModule { }
