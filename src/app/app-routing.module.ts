import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmplistComponent } from './emplist/emplist.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
 {path:'', redirectTo:'/register', pathMatch:'full'},
 {path:'register',component:SignupComponent, pathMatch:'full'},
 {path:'login',component:LoginComponent, pathMatch:'full'},
 {path:'employeelist',component:EmplistComponent, pathMatch:'full'},
 {path:'dashboard',component:DashboardComponent, pathMatch:'full'},
 {path:'**',redirectTo:'/register', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
