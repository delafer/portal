import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkspaceComponent} from './workspace/workspace.component';
import {DashboardComponent} from '@features/dashboard/dashboard.component';
import {SettingsComponent} from '@features/settings/settings.component';
import {AboutComponent} from '@features/about/about.component';

const routes: Routes = [
  { path: '', component: WorkspaceComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: 'about',      component: AboutComponent }
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
