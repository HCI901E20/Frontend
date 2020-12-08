import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ZoneService } from './zone.service';

describe('ZoneService', () => {
  let service: ZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [ToastrService]
    });
    service = TestBed.inject(ZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
