import { Component, OnInit } from '@angular/core';
import { Config } from './common/config';
import { EmpmgmtserviceService } from './services/empmgmtservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'EmployeeManagement';
  appSettingsLoaded : boolean = false;
  
  constructor(private empmgmtservice: EmpmgmtserviceService) { }
    
 async ngOnInit() {
     console.log('AppComponent Loading')
    await this.empmgmtservice.getAppSettings();
    //Config.API_URL = Config.appSettings["empApiURL"];
    console.log('Config Url in Component Page:' + Config.API_URL)
    this.appSettingsLoaded = Config.appSettingsLoaded;
    console.log('Local variable:' + Config.appSettingsLoaded)
    console.log('Local variable1:' + this.appSettingsLoaded)
  }

}

