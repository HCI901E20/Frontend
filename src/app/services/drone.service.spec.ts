import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

import { DroneService } from './drone.service';

describe('DroneService', () => {
  let service: DroneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(DroneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
