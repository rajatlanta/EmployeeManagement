import { Component, OnInit, Output } from '@angular/core';
import { EmpmgmtserviceService } from '../services/empmgmtservice.service';
import { Router } from '@angular/router';
import { Config } from '../common/config';

@Component({
  selector: 'app-employee-child',
  templateUrl: './employee-child.component.html',
  styleUrls: ['./employee-child.component.css']
})
export class EmployeeChildComponent implements OnInit {

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

  employeeID1:string;

  async ngOnInit() {
   /* Config.appSettings  = await this.empmgmtservice.getAppSettings();
      Config.API_URL = Config.appSettings["empApiURL"];

    console.log('AppSetting:' + Config.appSettings);
    console.log('ApiURL:' + Config.API_URL); */
    
    if(Config.appSettings != undefined)
    {
      this.getAllEmployees();
    }
    else
    {
      console.log('undefined appsettings')
    }
  }

  closeDetails(data)
  {
    console.log('Child Component Data:'+ data);
    this.employeeDetailsVisible = false;
    this.getAllEmployees();
  }

  cancelDetails()
  {
    this.employeeDetailsVisible = false;
    //this.getAllEmployees();
  }

  ShowEmployeeAdd()
  {
    this.employeeID1 = "-1";
    this.employeeDetailsVisible = true;
  }

  editEmployee(empID: string)
  {
    this.employeeID1 = empID;
    this.employeeDetailsVisible = true;
  }

   deleteEmployee(empID : number)
  {
      this.empmgmtservice.deleteEmployee(empID).subscribe(items =>{
      console.log(items);
      this.getAllEmployees(); 
      });
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

}
