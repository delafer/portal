import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AuthenticationService} from '@appcore/services';
import {AcccessToken} from '@common/models/acccess.token';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  profileForm : FormGroup;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {

    const helper = new JwtHelperService();

    const decodedToken: AcccessToken = helper.decodeToken(this.authenticationService.currentUserValue.access_token);

    //console.log('DECODED:',JSON.stringify(decodedToken));

    this.profileForm = new FormGroup({
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
  }

  public submitForm() {

  }

}
