import { Component, OnInit } from '@angular/core';
import { Config } from '../common/config';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errMessage : string =''
  constructor() { }

  ngOnInit(): void {
    this.errMessage = Config.ErrorMessage;
  }

}
