import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FriendComponent } from './friend/friend.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { AuthGuard } from './shared/auth.guard';
//const routes: Routes = [];

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'friends', component: FriendComponent },
  { path: '', component: LoginComponent},
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard],data : { role : '2'} },
  { path: "manager", component: ManagerComponent,canActivate: [AuthGuard],data : { role : '1'} }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
