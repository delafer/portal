import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { TileComponent } from './dashboard/tile/tile.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { UnsanitizeComponent } from '@shared/components/unsanitize.component';
import { LoadScriptDirective } from '@shared/directives';
import { SafePipe } from '@shared/pipes';
import { NgbPaginationModule, NgbRatingModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { StripPipe} from '../../shared/pipes';
import { HoverDirective} from '../../shared/directives/hover.directive';
import { ExecuteComponent } from './dashboard/execute/execute.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IframeDirective } from '../../shared/directives';
@NgModule({
  declarations: [WorkspaceComponent,
    NavbarComponent,
    OverviewComponent,
    TileComponent,
    AboutComponent,
    SettingsComponent,
    UnsanitizeComponent,
    LoadScriptDirective,
    IframeDirective,
    SafePipe,
    StripPipe,
    HoverDirective,
    ExecuteComponent,
    DashboardComponent

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
