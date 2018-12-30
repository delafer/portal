import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TileComponent } from './dashboard/tile/tile.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent} from './about/about.component';
import { UnsanitizeComponent } from '@shared/components/unsanitize.component';
import { LoadScriptDirective } from '@shared/directives';
import { SafePipe } from '@shared/pipes';
import {NgbPaginationModule, NgbRatingModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {StripPipe} from '../../shared/pipes';
import {HoverDirective} from '../../shared/directives/hover.directive';
@NgModule({
  declarations: [WorkspaceComponent,
    NavbarComponent,
    DashboardComponent,
    TileComponent,
    AboutComponent,
    SettingsComponent,
    UnsanitizeComponent,
    LoadScriptDirective,
    SafePipe,
    StripPipe,
    HoverDirective

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbRatingModule,
    NgbTypeaheadModule

  ]
})
export class HomeModule { }
