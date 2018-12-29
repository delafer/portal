import { Component, OnInit } from '@angular/core';
import {AppService} from '@app/core/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public tileList: string[];
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.tileList = this.appService.getTiles();
  }

}
