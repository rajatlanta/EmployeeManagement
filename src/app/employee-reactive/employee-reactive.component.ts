import { Component, OnInit } from '@angular/core';
import { Config } from '../common/config';
import { EmpmgmtserviceService } from '../services/empmgmtservice.service';
import { Router } from '@angular/router';
//import { ReactiveFormsModule } from '@angular/forms';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Employee } from '../models/common';

@Component({
  selector: 'app-employee-reactive',
  templateUrl: './employee-reactive.component.html',
  styleUrls: ['./employee-reactive.component.css']
})
export class EmployeeReactiveComponent implements OnInit {

  constructor(private empmgmtservice: EmpmgmtserviceService, private router: Router) { }

  employees:any;

  alldepartments:any;
  employeeID: number;
  employeeName: string;
  department: string;
  salary: string;
  phoneNumber: string;
  deptSelected: number;

  employeeDetailsVisible:boolean = false;
  form : FormGroup;

  async ngOnInit() {
   
    if(Config.appSettings != undefined)
    {
      this. getAllEmployees();
    }
    else
    {
      console.log('undefined appsettings')
    }

  }

  getAllEmployees()
  {
    this.empmgmtservice.getEmployees().subscribe(item => {item 
      this.employees = item;

      this.empmgmtservice.getDepartments().subscribe(item => {item 
        this.alldepartments = item;
        console.log('All Departments:' + item);
      }) 

    },
    (err: Error) =>
    {
      console.log('Error Occured in:' + err.message);
      Config.ErrorMessage = err.message
      this.router.navigate(['/error']);
    },
    () =>
    {
      console.log('Completed');
    })
  }

  Edit()
  {
    console.log('Edit Clicked');
    this.form = new FormGroup({
      name: new FormControl('Ajay'),
      department: new FormControl('Sales'),
      salary: new FormControl('36500'),
      phoneNumber: new FormControl('978659090')
    })
    console.log(this.form.value);
  }

  saveEmployee()
  {
    console.log(this.form.value);
    console.log('Id:' + this.form.value['id']);
    console.log('Name:' + this.form.value['name']);
    console.log('Department:' + this.form.value['department']);
    console.log('Salary:' + this.form.value['salary']);
    console.log('PhoneNumber:' + this.form.value['phoneNumber']);
    
    let newemployee: Employee = {
      employeeID : this.form.value['id'],
      employeeName :  this.form.value['name'],
      departmentID : this.form.value['department'],
      salary: this.form.value['salary'],
      phoneNumber: this.form.value['phoneNumber']
    }

    if(this.form.value['id'] == -1)
    {
        this.empmgmtservice.insertEmployee(newemployee).subscribe(items =>{
          console.log(items);
          this.getAllEmployees();  
        },
        (err: Error) => {
          console.log('Error:' + err.message);
        }
        );   
    }
    else
    {
        this.empmgmtservice.updateEmployee(newemployee).subscribe(items =>{
          console.log(items);
          this.getAllEmployees();  
        },
        (err: Error) => {
          console.log('Error:' + err.message);
        }
        ); 
    }  
    this.employeeDetailsVisible = false;
    this.cleanupEmployeeDetails();
    this. getAllEmployees();
  } 

  Cancel()
  {
    this.employeeDetailsVisible = false;
    this.cleanupEmployeeDetails();
  }

  cleanupEmployeeDetails()
  {
    this.employeeID = -1;
    this.employeeName = "";
    this.department = "";
    this.salary = ""; 
    this.phoneNumber = "";
    this.deptSelected = -1;
  }

  editEmployee(empID: number)
  {
    this.employeeDetailsVisible = true;

    this.empmgmtservice.getEmployee(empID).subscribe(item => {item 
      console.log(item);
      this.form = new FormGroup({
        id: new FormControl(item[0]['employeeID']),
        //name: new FormControl(item[0]['employeeName'], [Validators.required, Validators.email]),
        name: new FormControl(item[0]['employeeName'], [Validators.required]),
        department: new FormControl(item[0]['departmentID']),
        //this.deptSelected = item[0]['departmentID'];
        salary: new FormControl(item[0]['salary']),
        phoneNumber: new FormControl(item[0]['phoneNumber'])
      })
      
    },
    (err: Error) =>
    {
      console.log('Error Occured in:' + err.message);
      Config.ErrorMessage = err.message
      this.router.navigate(['/error']);
    })
  }

  changeDepartment() {
    console.log('Department Changed:'+ this.deptSelected);
  }

  deleteEmployee(empID : number)
  {
      this.empmgmtservice.deleteEmployee(empID).subscribe(items =>{
      console.log(items);
      this.getAllEmployees(); 
      });
  }

  ShowEmployeeAdd()
  {
    this.form = new FormGroup({
      id: new FormControl("-1"),
      name: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    })
    
    this.employeeDetailsVisible = true;
    this.cleanupEmployeeDetails();

  }


}
