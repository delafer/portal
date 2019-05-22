import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationService} from '$core/services';
import {AcccessToken} from '$models/acccess.token';
import {Constants} from '$common/constants/Constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  isAdmin(): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    const helper = new JwtHelperService();
    const decodedToken: AcccessToken = helper.decodeToken(currentUser.access_token);
    return decodedToken.resource_access.account.roles.includes(Constants.adminRole);
  }
}
