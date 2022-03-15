import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Config } from '../common/config';
//import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class EmpmgmtserviceService {

  constructor(private http: HttpClient
    //, private notificationService: NotificationService
    ) { }

   async getAppSettings() {
    Config.ErrorMessage = "Error Occurred Rajkiran";

   await setTimeout (() => {
      console.log("Hello from setTimeout");
      
   },  10000);

    await this.http.get<any>('assets/appsettings.json').toPromise().then(data => 
      {
         
          Config.appSettings = data;
          Config.API_URL = Config.appSettings["empApiURL"];
         
          console.log('43435345')
          Config.appSettingsLoaded = true;
          
         console.log('11111111')
      }
      ); 

     console.log('2222222')
    /*if (response != null) {
      console.log('getAppSettings:', response);
      console.log('Url:', response['empApiURL']);
      
    }*/
    //return response;
  }

  getDepartments() 
  {
      var q =this.http.get(Config.API_URL + '/Department');
      console.log('getDepartments');
      return q;
  } 

  getDepartment(deptID: number) 
  {
      var q =this.http.get(Config.API_URL +'/Department/GetDepartment/'+ deptID);
      console.log('getDepartment');
      return q;
  } 

  insertDepartment(department)
  {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.post(Config.API_URL +'/Department', department, {headers: headers});
  }

  updateDepartment(department)
  {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.put(Config.API_URL +'/Department', department, {headers: headers});
  }

  deleteDepartment(deptID:number) 
  {
     return this.http.delete('http://localhost:51382/api/Department/'+ deptID);
  }

  getEmployees() 
  {
      
      var q =this.http.get(Config.API_URL +'/EmployeeEF');
      console.log('getEmployees');
      return q;
  } 

  getEmployee(empID: number) 
  {
      var q =this.http.get(Config.API_URL +'/EmployeeEF/GetEmployee/'+ empID);
      console.log('getEmployee');
      return q;
  } 

  insertEmployee(employee)
  {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.post(Config.API_URL +'/EmployeeEF', employee, {headers: headers});
  }

  updateEmployee(employee)
  {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.put(Config.API_URL +'/EmployeeEF', employee, {headers: headers});
  }

  deleteEmployee(empID:number) 
  {
     return this.http.delete('http://localhost:51382/api/EmployeeEF/'+ empID);
  }

 /* showSuccessMessage(successMessage)
  {
    this.notificationService.show({
      content: successMessage,
      hideAfter: 3000,
      position: { horizontal: 'right', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: false }
  });
  }

  showErrorMessage(errorMessage)
  {
    this.notificationService.show({
      content: errorMessage,
      hideAfter: 3000,
      position: { horizontal: 'right', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: false }
  });
  } */
  

}
