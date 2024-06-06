import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: '/Authentication/SignIn', pathMatch: 'full' },
  { path: 'DashBoard', loadChildren: () => import('./SuerAdminDashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'Authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
