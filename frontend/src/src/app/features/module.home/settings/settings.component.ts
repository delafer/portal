import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

  public submitForm() {

  }

}
