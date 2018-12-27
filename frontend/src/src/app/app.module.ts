import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './layout/root/app.component';
import { NavbarComponent } from '@layout/navbar/navbar.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { TileComponent } from '@features/tile/tile.component';
import { SettingsComponent } from '@features/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './features/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    TileComponent,
    SettingsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
