import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DroneService } from './drone.service';

describe('DroneService', () => {
  let service: DroneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [ToastrService]
    });
    service = TestBed.inject(DroneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct color CSS class', () => {
    expect(service.getDroneColor(0)).toBe('drone-status-idle');
    expect(service.getDroneColor(1)).toBe('drone-status-idle');
    expect(service.getDroneColor(2)).toBe('drone-status-active');
    expect(service.getDroneColor(3)).toBe('drone-status-active');
    expect(service.getDroneColor(4)).toBe('drone-status-active');
    expect(service.getDroneColor(5)).toBe('drone-status-active');
    expect(service.getDroneColor(6)).toBe('drone-status-active');
    expect(service.getDroneColor(440)).toBe('drone-status-error');
  });

  it('should return the correct icon CSS class', () => {
    expect(service.getDroneIconColor(0)).toBe('drone-status-idle-icon');
    expect(service.getDroneIconColor(1)).toBe('drone-status-idle-icon');
    expect(service.getDroneIconColor(2)).toBe('drone-status-active-icon');
    expect(service.getDroneIconColor(3)).toBe('drone-status-active-icon');
    expect(service.getDroneIconColor(4)).toBe('drone-status-active-icon');
    expect(service.getDroneIconColor(5)).toBe('drone-status-active-icon');
    expect(service.getDroneIconColor(6)).toBe('drone-status-active-icon');
    expect(service.getDroneIconColor(440)).toBe('drone-status-error-icon');
  });

  it('should check if the livefeed is disabled', () => {
    expect(service.isLivefeedDisabled(0)).toBeTrue();
    expect(service.isLivefeedDisabled(1)).toBeTrue();
    expect(service.isLivefeedDisabled(2)).toBeFalse();
    expect(service.isLivefeedDisabled(3)).toBeFalse();
    expect(service.isLivefeedDisabled(4)).toBeFalse();
    expect(service.isLivefeedDisabled(5)).toBeFalse();
    expect(service.isLivefeedDisabled(6)).toBeFalse();
    expect(service.isLivefeedDisabled(440)).toBeTrue();
  });
});
