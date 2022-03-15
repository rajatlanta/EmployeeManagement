import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChilddetailsComponent } from './employee-childdetails.component';

describe('EmployeeChilddetailsComponent', () => {
  let component: EmployeeChilddetailsComponent;
  let fixture: ComponentFixture<EmployeeChilddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeChilddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeChilddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
