import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '$features/root/app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from '$app/core/interceptors';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
  /*
  List of modules to import into this module. Everything from the
  imported modules is available to declarations of this module. */
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxWebstorageModule.forRoot()
  ],
  /*
  List of components, directives, and pipes that belong to this module.
   */
  declarations: [
    AppComponent
  ],
  /*
  List of components, directives, and pipes visible to modules that import
  this module.
   */
  exports: [

  ],
  /*
  List of dependency injection providers (e.G. services, interceptors, etc)
  visible both to the contents of this module and to importers of this module.
   */
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

  ],
  /*
  List of components to bootstrap when this module is bootstrapped.
   */
  bootstrap: [AppComponent]
})
export class AppModule {
}
