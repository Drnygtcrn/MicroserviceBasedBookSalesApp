import { TestBed } from '@angular/core/testing';

import { GirisService } from './giris.service';

describe('GirisService', () => {
  let service: GirisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GirisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
