import { Component, OnInit } from '@angular/core';
import { DroneCardComponent } from 'src/app/components/drone-card/drone-card.component';
import { ApiService } from 'src/app/services/api.service';
import mapstyle from '../../../assets/mapstyle.json';
import { Drone } from '../../models/drone.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapstyle = mapstyle;
  drones = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    /*
    this.apiService.getDrones().subscribe((data: Drone[]) => {
      this.drones = data;
    });
    */
   this.drones.push(
    {
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
      ip: '1.2.3.4'
    }
   );
   this.drones.push(
    {
      uuid: 'test2',
      lastUpdate: new Date('2020-09-30T11:06:08'),
      currentPosition: {
        uuid: 'pos2',
        latitude: 57.052115,
        longitude: 9.926307,
        altitude: 10
      },
      batteryPercentage: 52,
      status: 0,
      ip: '1.2.3.4'
    }
   );
   this.drones.push(
    {
      uuid: 'test3',
      lastUpdate: new Date('2020-09-30T09:06:17'),
      currentPosition: {
        uuid: 'pos3',
        latitude: 57.049586,
        longitude: 9.927116,
        altitude: 10
      },
      batteryPercentage: 71,
      status: 1,
      ip: '1.2.3.4'
    }
   );
  }
}
