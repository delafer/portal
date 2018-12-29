import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '@home/dashboard/dashboard.component';
import {SettingsComponent} from '@home/settings/settings.component';
import {AuthGuard} from '@appcore/guards';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './features/module.login/login.module#LoginModule' },
  { path: 'home', loadChildren: './features/module.home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
