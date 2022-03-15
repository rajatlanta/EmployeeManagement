import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { ErrorComponent } from './error/error.component';
import { MatSliderModule } from '@angular/material/slider';

import { EmployeeReactiveComponent } from './employee-reactive/employee-reactive.component';
//import { DepartmentReactiveComponent } from './department-reactive/department-reactive.component';

import { EmployeeChildComponent } from './employee-child/employee-child.component';
//import { DepartmentChildComponent } from './department-child/department-child.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'department',        component: DepartmentComponent },
  { path: 'employeereactive',        component: EmployeeReactiveComponent },
  //{ path: 'departmentreactive',        component: DepartmentReactiveComponent },
  { path: 'employeechild',        component: EmployeeChildComponent },
  { path: 'test',        component: TestComponent },
  { path: 'error',        component: ErrorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes),MatSliderModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
