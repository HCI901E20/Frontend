import { Component, OnInit } from '@angular/core';
import { DroneCardComponent } from 'src/app/components/drone-card/drone-card.component';
import mapstyle from '../../../assets/mapstyle.json';
import { Drone } from '../../models/drone.model';
import { DroneStatus } from 'src/app/models/drone-status.enum';
import { DroneService } from 'src/app/services/drone.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapstyle = mapstyle;

  constructor(public droneService: DroneService) {}

  ngOnInit(): void {
    this.droneService.updateDrones();
  }
}
