import { TestBed } from '@angular/core/testing';

import { AESEncDecServiceService } from './aesenc-dec-service.service';

describe('AESEncDecServiceService', () => {
  let service: AESEncDecServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AESEncDecServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
