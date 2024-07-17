import { TestBed } from '@angular/core/testing';

import { InfprodService } from './infprod.service';

describe('InfprodService', () => {
  let service: InfprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
