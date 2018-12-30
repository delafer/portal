import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkspaceComponent} from './workspace/workspace.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {AboutComponent} from './about/about.component';
import {ExecuteComponent} from './dashboard/execute/execute.component';

const routes: Routes = [
  { path: '', component: WorkspaceComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/execute/:id', component: ExecuteComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: 'about',      component: AboutComponent }
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
