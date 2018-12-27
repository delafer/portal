import {Component, OnInit} from '@angular/core';
import { environment } from '@environment/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  title = 'portal';

  ngOnInit(): void {
    console.log('Application started');
    console.log('Server API Url: ' + environment.serverUrl);
  }

}
