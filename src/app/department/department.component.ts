import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Config } from '../common/config';
import { EmpmgmtserviceService } from '../services/empmgmtservice.service';
import {NgForm} from '@angular/forms';
import { Department } from '../models/common';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments:any
  departmentName: string;
  departmentID: string;
  /*[
    {DepartmentID:'1', DepartmentName:'HR'},
    {DepartmentID:'2', DepartmentName:'Finance'},
    {DepartmentID:'3', DepartmentName:'IT'}
  ] */
  departDetailsVisible:boolean = false;
  constructor(private empmgmtservice: EmpmgmtserviceService) { }

  ngOnInit(): void {
    this.empmgmtservice.getDepartments().subscribe(item => {item 
      this.departments = item;
    }

    )
  }

  getAllDepartments()
  {
    this.empmgmtservice.getDepartments().subscribe(item => {item 
      this.departments = item;
    },
    (err: Error) =>
    {
      console.log('Error Occured in:' + err.message);
      Config.ErrorMessage = err.message
    },
    () =>
    {
      console.log('Completed');
    })
  }

  ShowDepartmentAdd()
  {
    this.departDetailsVisible = true;
    this.cleanupDepartmentDetails();
  }

  editDepartment(deptID: number)
  {
    this.departDetailsVisible = true;
    console.log(deptID);
    this.empmgmtservice.getDepartment(deptID).subscribe(item => {item 
      console.log(item);
      this.departmentID = item[0]['departmentId']
      this.departmentName = item[0]['departmentName'];

      //console.log(deptID);

    },
    (err: Error) =>
    {
      console.log('Error Occured in:' + err.message);
      Config.ErrorMessage = err.message
      //this.router.navigate(['/error']);
    })
  }

  saveDepartment(form : NgForm)
  {
    console.log(form.value);
    console.log('Department:' + form.controls['txtDepartment'].value);
    
    console.log('In SaveDepartment method.');

    let newdepartment: Department = {
      departmentID : form.controls['lblDepartmentID'].value,
      departmentName :  form.controls['txtDepartment'].value
    }

    if(form.controls['lblDepartmentID'].value == -1)
    {
        this.empmgmtservice.insertDepartment(newdepartment).subscribe(items =>{
          console.log(items);
          this.getAllDepartments();  
        },
        (err: Error) => {
          console.log('Error:' + err.message);
        }
        );   
    }
    else
    {
        this.empmgmtservice.updateDepartment(newdepartment).subscribe(items =>{
          console.log(items);
          this.getAllDepartments();  
        },
        (err: Error) => {
          console.log('Error:' + err.message);
        }
        ); 
    }  
    this.departDetailsVisible = false;
    this.cleanupDepartmentDetails();
    this.getAllDepartments();
  }


  deleteDepartment(deptID: number)
  {
    this.empmgmtservice.deleteDepartment(deptID).subscribe(items =>{
      console.log(items);
      this.getAllDepartments(); 
    });
  }

  cleanupDepartmentDetails()
  {
    this.departmentID = "-1";
    this.departmentName = "";
  }

  Cancel()
  {
    console.log('Department Cancel Clicked');
    this.departDetailsVisible = false;
    this.cleanupDepartmentDetails();
  }


   

}
