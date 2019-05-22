import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-unsanitize',
  template: `
    <iframe [src]="iframe"></iframe>
  `,
  styles: []
})
export class UnsanitizeComponent implements OnInit {

  public iframe: any;

  constructor(private sanitizer: DomSanitizer) {
    this.iframe = sanitizer.bypassSecurityTrustResourceUrl('<iframe id="ZMgameFrame" src="http://cdn.htmlgames.com/HalloweenMahjong/index.html?bgcolor=white" width="800" height="480" frameborder="0" style="display:block" allowfullscreen></iframe>');
  }


  ngOnInit() {
  }

}
