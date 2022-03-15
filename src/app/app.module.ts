import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeReactiveComponent } from './employee-reactive/employee-reactive.component';
//import { DepartmentReactiveComponent } from './department-reactive/department-reactive.component';
import { EmployeeChildComponent } from './employee-child/employee-child.component';
//import { DepartmentChildComponent } from './department-child/department-child.component';
import { EmployeeChilddetailsComponent } from './employee-childdetails/employee-childdetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';
//import { ToastsContainerComponent } from './toasts-container/toasts-container.component';

//import {ReactiveFormsModule } from '@angular/reactive-forms';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    ErrorComponent,
    EmployeeReactiveComponent,
  //DepartmentReactiveComponent,
    EmployeeChildComponent,
   // DepartmentChildComponent,
    EmployeeChilddetailsComponent,
   TestComponent
   //ToastsContainerComponent
  ],
  imports: [
    BrowserModule,HttpClientModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, ReactiveFormsModule, NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
