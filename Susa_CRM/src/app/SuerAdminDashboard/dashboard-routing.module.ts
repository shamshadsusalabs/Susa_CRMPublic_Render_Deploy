import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { TaskComponent } from './task/task.component';
import { MainComponentComponent } from './main-component/main-component.component';

import { CalenderComponent } from './calender/calender.component';
const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] ,
    children: [
      { path: '', redirectTo: 'main-content', pathMatch: 'full' },
      { path: 'main-content', component: MainComponentComponent },
      { path: 'Tasks', component: TaskComponent},
      { path: 'Calendar', component: CalenderComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
