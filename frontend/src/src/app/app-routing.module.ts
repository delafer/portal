import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '@features/dashboard/dashboard.component';
import {SettingsComponent} from '@features/settings/settings.component';
import {AuthGuard} from './core/guards';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './features/login/login.module#LoginModule' },
  { path: 'home', loadChildren: './layout/home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
