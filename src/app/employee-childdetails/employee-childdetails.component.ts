import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/common';
import { EmpmgmtserviceService } from '../services/empmgmtservice.service';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Config } from '../common/config';

@Component({
  selector: 'app-employee-childdetails',
  templateUrl: './employee-childdetails.component.html',
  styleUrls: ['./employee-childdetails.component.css']
})
export class EmployeeChilddetailsComponent implements OnInit {

  constructor(private empmgmtservice : EmpmgmtserviceService, private router : Router) { }

  @Input() empID: string;
   @Output() notify : EventEmitter<string> = new EventEmitter<string>();
   @Output() cancelclick : EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;
  alldepartments:any;

  ngOnInit(): void {
    console.log('empID in child:'+this.empID);
    if(this.empID == "-1")
    {
      this.form = new FormGroup({
        id: new FormControl("-1"),
        name: new FormControl('', [Validators.required]),
        department: new FormControl('', [Validators.required]),
        salary: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required])
      })
    }
    else
    {
      console.log('empID in child else:'+this.empID);
      this.empmgmtservice.getEmployee(Number(this.empID)).subscribe(item => {item 
        console.log(item);
        this.form = new FormGroup({
          id: new FormControl(item[0]['employeeID']),
          //name: new FormControl(item[0]['employeeName'], [Validators.required, Validators.email]),
          name: new FormControl(item[0]['employeeName'], [Validators.required]),
          department: new FormControl(item[0]['departmentID']),
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
    
    this.empmgmtservice.getDepartments().subscribe(item => {item 
      this.alldepartments = item;
      console.log('All Departments:' + item);
    }) 
    console.log(this.empID);
  }

  ngOnChanges()
  {
    console.log('empID in child:'+this.empID);
    if(this.empID == "-1")
    {
      this.form = new FormGroup({
        id: new FormControl("-1"),
        name: new FormControl('', [Validators.required]),
        department: new FormControl('', [Validators.required]),
        salary: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required])
      })
    }
    else
    {
      console.log('empID in child else:'+this.empID);
      this.empmgmtservice.getEmployee(Number(this.empID)).subscribe(item => {item 
        console.log(item);
        this.form = new FormGroup({
          id: new FormControl(item[0]['employeeID']),
          //name: new FormControl(item[0]['employeeName'], [Validators.required, Validators.email]),
          name: new FormControl(item[0]['employeeName'], [Validators.required]),
          department: new FormControl(item[0]['departmentID']),
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
    console.log(this.empID);
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
          this.notify.emit("this message is from child component");
          //this.getAllEmployees();  
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
          this.notify.emit("this message is from child component");
          //this.getAllEmployees();  
        },
        (err: Error) => {
          console.log('Error:' + err.message);
        }
        ); 
    }
  } 

  editEmployee(empID: number)
  { 
    this.empmgmtservice.getEmployee(empID).subscribe(item => {item 
      console.log(item);
      this.form = new FormGroup({
        id: new FormControl(item[0]['employeeID']),
        //name: new FormControl(item[0]['employeeName'], [Validators.required, Validators.email]),
        name: new FormControl(item[0]['employeeName'], [Validators.required]),
        department: new FormControl(item[0]['departmentID']),
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

  cancel()
  {
    this.cancelclick.emit();
  }

}
