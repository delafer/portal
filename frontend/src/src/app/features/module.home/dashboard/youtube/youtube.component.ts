import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Game} from '@common/models';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  @Input() game: Game;

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  getYoutubeId(): string {
    let video_id = this.game.youtube.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }

  get iframe(): string {
    //modestbranding=1
    let youtubeid = this.getYoutubeId();
    let template: string = `<iframe id="ytplayer" type="text/html" width="680" height="510" src="https://www.youtube.com/embed/${youtubeid}?&autoplay=1&theme=light&color=white&fs=0&autohide=2&modestbranding=1&fs=0&showinfo=0&rel=0&iv_load_policy=3&cc_load_policy=1&ecver=1" frameborder="0" allowtransparency="true"></iframe>`;
    return template;
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true, size: 'lg'});
  }

}
