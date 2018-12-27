/* 3rd party libraries */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/* our own custom services  */
/* import { SomeSingletonService } from './some-singleton/some-singleton.service'; */

@NgModule({
  imports: [
    /* 3rd party libraries */
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    /* our own custom services  */
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}