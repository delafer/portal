import {Component, OnInit} from '@angular/core';
import {GameService} from '$core/services/games.service';
import {Game} from '$common/models';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  games: Game[];

  constructor(private heroService: GameService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.heroService.getGames()
      .subscribe(games => this.games = games);
  }

  add(name: string = 'new name'): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addGame({name} as Game)
      .subscribe(game => {
        this.games.push(game);
      });
  }

  delete(hero: Game): void {
    this.games = this.games.filter(h => h !== hero);
    this.heroService.deleteGame(hero).subscribe();
  }

}

