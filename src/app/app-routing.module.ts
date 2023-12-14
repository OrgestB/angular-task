import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: "viewMode", component: ViewModeComponent},
  {path: "settings", component: SettingsComponent},
  {path: "", redirectTo: "/viewMode", pathMatch: "full"},
  {path: "**", component: ViewModeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
