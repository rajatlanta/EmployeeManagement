import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReactiveComponent } from './employee-reactive.component';

describe('EmployeeReactiveComponent', () => {
  let component: EmployeeReactiveComponent;
  let fixture: ComponentFixture<EmployeeReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeReactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
