import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
/*make sure you import it here*/
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageboxComponent} from '$shared/components/messagebox/messagebox.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent,
    MessageboxComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
  ,entryComponents: [MessageboxComponent]
})
export class LoginModule {
}
