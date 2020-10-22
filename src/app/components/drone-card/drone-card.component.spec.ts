import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DroneCardComponent } from './drone-card.component';
import { DroneService } from 'src/app/services/drone.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('DroneCardComponent', () => {
  let component: DroneCardComponent;
  let fixture: ComponentFixture<DroneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      declarations: [ DroneCardComponent],
      providers: [DroneService, ToastrService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneCardComponent);
    component = fixture.componentInstance;

    component.inputIndex = 1;
    component.inputDrone = {
      uuid: 'test1',
      lastUpdate: new Date('2020-09-30T11:06:00'),
      currentPosition: {
        uuid: 'pos1',
        latitude: 57.053992,
        longitude: 9.923754,
        altitude: 10
      },
      batteryPercentage: 73,
      status: 0,
      ip: '1.2.3.4',
      ui: {
        statusString: 'Test',
        iconUrl: '/assets/icons/drone_icon_Idle.svg'
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct durations', () => {
    const date: Date = new Date('2020-10-09T10:00:00Z');
    const days: Date = new Date('2020-10-07T23:59:59Z');
    const hours: Date = new Date('2020-10-09T08:30:00Z');
    const minutes: Date = new Date('2020-10-09T09:58:59Z');
    const seconds: Date = new Date('2020-10-09T09:59:30Z');

    expect(component.getLastUpdate(date, days)).toBe('1 days');
    expect(component.getLastUpdate(date, hours)).toBe('1 hours');
    expect(component.getLastUpdate(date, minutes)).toBe('1 min');
    expect(component.getLastUpdate(date, seconds)).toBe('30 sec');
  });
});
