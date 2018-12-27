import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NavbarComponent } from '@layout/navbar/navbar.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { TileComponent } from '@features/tile/tile.component';
import { SettingsComponent } from '@features/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import {AboutComponent} from '@features/about/about.component';

@NgModule({
  declarations: [WorkspaceComponent,
    NavbarComponent,
    DashboardComponent,
    TileComponent,
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
