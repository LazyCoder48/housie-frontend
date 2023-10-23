import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousieBoardComponent } from './housie-board/housie-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetupGameComponent } from './setup-game/setup-game.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'setup-game', component: SetupGameComponent},
  {path: 'housie-board', component: HousieBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
