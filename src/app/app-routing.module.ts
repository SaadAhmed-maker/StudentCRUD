import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

const routes: Routes = [
   {path:'', redirectTo:'login', pathMatch:'full'},
  {
    path:'login',
    component:LoginComponent
  },

  {
  path:'student-dash',
    component: StudentDashboardComponent , canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
