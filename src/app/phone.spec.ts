import { TestBed } from '@angular/core/testing';

import { Phone } from './phone';

describe('Phone', () => {
  let service: Phone;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Phone);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
