import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {HomeComponent} from './components/user/home/home.component';
import {DetailComponent} from './components/user/detail/detail.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {ProductListComponent} from './components/admin/product-list/product-list.component';
import {UserTemplateComponent} from './components/template/user-template/user-template.component';
import {AdminTemplateComponent} from './components/template/admin-template/admin-template.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransactionListComponent} from './components/admin/transaction-list/transaction-list.component';
import { TasksComponent } from './components/user/tasks/tasks.component';
import { MainComponent } from './components/user/main/main.component';
import { CategoriesComponent } from './components/user/categories/categories.component';
import { ViewTasksComponent } from './components/user/view-tasks/view-tasks.component';
import { ChartComponent } from './components/user/chart/chart.component';
import { MapsComponent } from './components/user/maps/maps.component';
import {AgmCoreModule} from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    DetailComponent,
    DashboardComponent,
    UserListComponent,
    ProductListComponent,
    UserTemplateComponent,
    AdminTemplateComponent,
    NotFoundComponent,
    UnathorizedComponent,
    TransactionListComponent,
    TasksComponent,
    MainComponent,
    CategoriesComponent,
    ViewTasksComponent,
    ChartComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
