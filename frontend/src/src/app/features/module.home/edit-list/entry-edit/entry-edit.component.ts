import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Game} from '$common/models';
import {GameService} from '$core/services/games.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateCustomAdapter} from './NgbDateCustomAdapter';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateCustomAdapter}]
})
export class EntryEditComponent implements OnInit {
  @Input() game: Game;

  gameForm: FormGroup;
  submitted = false;

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
      .subscribe(game => {
        this.game = game;
        this.gameForm = new FormGroup({
          name: new FormControl(game.name, Validators.required),
          category: new FormControl(game.category, Validators.required),
          created: new FormControl(game.create_date),
          desc: new FormControl(game.description, Validators.required),
          width: new FormControl(game.width),
          height: new FormControl(game.height),
          home: new FormControl(game.url),
          iframe: new FormControl(game.embed),
          youtube: new FormControl(game.youtube),
          thumb: new FormControl(game.thumb, Validators.required)
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  play(): void {
    this.router.navigate(['/home/dashboard/execute/9']);
  }

  save(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.gameForm.invalid) {
      return;
    }

    this.updateGame();
    this.gameService.updateGame(this.game)
      .subscribe(() => this.goBack());
  }

  private updateGame() {
    let value: any = this.gameForm.value;
    console.log(JSON.stringify(value));

    this.game.name = value.name;
    this.game.category = value.category;
    this.game.create_date = value.created;
    this.game.description = value.desc;
    this.game.width = value.width;
    this.game.height = value.height;
    this.game.url = value.home;
    this.game.embed = value.iframe;
    this.game.youtube = value.youtube;
    this.game.thumb = value.thumb;


    console.log(JSON.stringify(this.game));
  }
}
