import { TestBed } from '@angular/core/testing';

import { EmpmgmtserviceService } from './empmgmtservice.service';

describe('EmpmgmtserviceService', () => {
  let service: EmpmgmtserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpmgmtserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
