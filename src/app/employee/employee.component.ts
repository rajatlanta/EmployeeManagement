import { Component, OnInit } from '@angular/core';
import { Config } from '../common/config';
import { EmpmgmtserviceService } from '../services/empmgmtservice.service';
import { Router } from '@angular/router';
import { Employee } from '../models/common';
//import { config } from 'process';
import {NgForm} from '@angular/forms';
import { ToastService } from '../toast.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:any = [];

  alldepartments:any;
 /* alldepartments =
  [
    {departmentId:'1', departmentName:'HR'},
    {departmentId:'2', departmentName:'Finance'},
    {departmentId:'3', departmentName:'IT'}
  ] */
  employeeID: number;
  employeeName: string;
  department: string;
  salary: string;
  phoneNumber: string;
  deptSelected: number;

  employeeDetailsVisible:boolean = false;

  page = 1;
  pageSize = 4;
  collectionSize = 11;
  //collectionSize = COUNTRIES.length;
  //countries: Country[];

  constructor(private empmgmtservice: EmpmgmtserviceService, private router: Router, private toastService : ToastService) { }

    async ngOnInit() {
     
   // Config.appSettings  = await this.empmgmtservice.getAppSettings();
    //Config.API_URL = Config.appSettings["empApiURL"]; 
    console.log('Test1');
    console.log(Config.ErrorMessage);
    console.log('AppSetting1:' + Config.appSettings);
    console.log('ApiURL1:' + Config.API_URL);

    this. getAllEmployees();
    
    /*if(Config.appSettings != undefined)
    {
      this. getAllEmployees();
    }
    else
    {
      console.log('undefined appsettings')
    } */
  }

  getAllEmployees()
  {
    this.empmgmtservice.getEmployees().subscribe(item => {item 
      this.employees = item;

      this.collectionSize = this.employees.length;

      this.employees = this.employees.map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)

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

 

  ngAfterViewInit()
  {
    
  }

  ngOnDestroy()
  {
    
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

  saveEmployee(form : NgForm)
  {
    console.log('Local EmployeeName:' + this.employeeName);
    console.log('Local Salary:' + this.salary);
    
    console.log(form.value);
    console.log('EmployeeName:' + form.controls['txtEmployeeName'].value);
    console.log('Department:' + form.controls['ddldepartment'].value);
    console.log('Salary:' + form.controls['txtSalary'].value);
    console.log('PhoneNumber:' + form.controls['txtPhoneNumber'].value);
    console.log('In SaveEmployee method.');

    

     let newemployee: Employee = {
      employeeID : form.controls['lblEmployeeID'].value,
      //employeeID : '15',
      employeeName :  form.controls['txtEmployeeName'].value,
      departmentID : form.controls['ddldepartment'].value,
      salary: this.salary,
      phoneNumber: form.controls['txtPhoneNumber'].value
    }

    if(form.controls['lblEmployeeID'].value == -1)
    {
        this.empmgmtservice.insertEmployee(newemployee).subscribe(items =>{
          console.log(items);
          this.getAllEmployees();  
          this.toastService.show('Employee Added');
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
          this.toastService.show('Employee Updated');
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

  editEmployee(empID: number)
  {
    this.employeeDetailsVisible = true;

    this.empmgmtservice.getEmployee(empID).subscribe(item => {item 
      //newemployee3: Employee = item;
      console.log(item);
      this.employeeID = item[0]['employeeID']
      this.employeeName = item[0]['employeeName'];
      this.deptSelected = item[0]['departmentID'];
      this.salary = item[0]['salary'];
      this.phoneNumber = item[0]['phoneNumber'];
      
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
    if(confirm("Are you sure to delete "))
    {
    this.empmgmtservice.deleteEmployee(empID).subscribe(items =>{
      console.log(items);
      this.getAllEmployees(); 
      });
    }
  }

  ShowEmployeeAdd()
  {
    this.employeeDetailsVisible = true;
    this.cleanupEmployeeDetails();
  }

  

}
