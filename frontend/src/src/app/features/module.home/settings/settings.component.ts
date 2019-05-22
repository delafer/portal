import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationService, UserContextContextService} from '$core/services';
import {AcccessToken} from '$common/models/acccess.token';
import {UserContext} from '$common/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  profileForm: FormGroup;

  user: UserContext;

  dirty: boolean = false;

  constructor(private authenticationService: AuthenticationService, private ctxService: UserContextContextService) {
  }

  ngOnInit() {

    const helper = new JwtHelperService();

    const decodedToken: AcccessToken = helper.decodeToken(this.authenticationService.currentUserValue.access_token);

    //console.log('DECODED:',JSON.stringify(decodedToken));

    this.profileForm = new FormGroup({
      text: new FormControl(""),
      login: new FormControl(decodedToken.preferred_username),
      email: new FormControl(decodedToken.email, [Validators.email, Validators.required]),
      verified: new FormControl(decodedToken.email_verified),
      firstName: new FormControl(decodedToken.given_name),
      secondName: new FormControl(decodedToken.family_name),
      issuer: new FormControl(decodedToken.iss),
      party: new FormControl(decodedToken.azp),
      roles: new FormControl(decodedToken.resource_access.account.roles),
      token: new FormControl(this.authenticationService.currentUserValue.access_token)
    });

    this.ctxService.getByName(decodedToken.preferred_username).subscribe(
      (result) => {
        this.user = result;
        this.profileForm.patchValue({text: result.text});

        this.profileForm.get('text').valueChanges.subscribe(val => {
          this.dirty = true;
        })

      }
    )
  }

  public submitForm() {
    this.user.text = this.profileForm.value.text;
    this.ctxService.updateByName(this.user).subscribe(
      _ => {
        this.dirty = false;
        console.log('User context saved.');
      }

    )
  }

}
