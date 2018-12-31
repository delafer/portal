import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Game} from '@common/models';
import {GameService} from '@appcore/services/games.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent implements OnInit {
  @Input() game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

  goBack(): void {
    this.location.back();
  }

  play(): void {
    this.router.navigate(['/home/dashboard/execute/9']);
  }

  save(): void {
    this.gameService.updateGame(this.game)
      .subscribe(() => this.goBack());
  }
}
