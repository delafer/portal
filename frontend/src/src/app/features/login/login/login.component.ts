import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(event: Event) {
    console.log("Entering home area!");
    event.preventDefault();

  }
}