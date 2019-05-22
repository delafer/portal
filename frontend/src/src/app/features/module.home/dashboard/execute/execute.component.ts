import {Component, Input, OnInit} from '@angular/core';
import {Game} from '$common/models';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '$core/services/games.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-execute',
  templateUrl: './execute.component.html',
  styleUrls: ['./execute.component.scss']
})
export class ExecuteComponent implements OnInit {

  @Input() game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  get iframe(): string {
    let template: string = `<iframe id="ZMgameFrame" src="${this.game.url}?bgcolor=black" width="${this.game.width}" height="${this.game.height}" frameborder="0" style="display:block" allowfullscreen></iframe>`;
    return template;
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.gameService.updateGame(this.game)
      .subscribe(() => this.goBack());
  }

}
