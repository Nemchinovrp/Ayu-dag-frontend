import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/user/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {DetailComponent} from './components/user/detail/detail.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {ProductListComponent} from './components/admin/product-list/product-list.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {TransactionListComponent} from './components/admin/transaction-list/transaction-list.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './model/role';
import {TasksComponent} from './components/user/tasks/tasks.component';
import {MainComponent} from './components/user/main/main.component';
import {ChartComponent} from './components/user/chart/chart.component';
import {MapsComponent} from './components/user/maps/maps.component';

const routes: Routes = [
  //Main page
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'product', component: HomeComponent},
  {path: 'chart', component: ChartComponent},
  {path: 'maps', component: MapsComponent},

  //User pages
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {path: 'detail', component: DetailComponent},
  {path: 'detail/:id', component: DetailComponent},

  //admin panel
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  {
    path: 'transaction-list',
    component: TransactionListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },

  //error pages
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
