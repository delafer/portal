import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '@features/dashboard/dashboard.component';
import {SettingsComponent} from '@features/settings/settings.component';
import {AboutComponent} from './features/about/about.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: 'about',      component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
