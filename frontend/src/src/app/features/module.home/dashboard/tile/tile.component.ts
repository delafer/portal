import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  constructor() { }

  @Input() titel: any;
  ngOnInit() {
  }

  static ONE_YEAR: number = 60 * 60 * 1000 * 24 * 365; //about one year, not a leap-year
  actualDate: number = Date.now();

  isNew(create_date: string) : boolean {
    return this.actualDate - Date.parse(create_date ) < TileComponent.ONE_YEAR;
  }
}
