import { Component, OnInit } from '@angular/core';
import mapstyle from '../../../assets/mapstyle.json';
import { DroneService } from 'src/app/services/drone.service';
import { MapService } from 'src/app/services/map.service';
import { faCrosshairs, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mapstyle = mapstyle;
  faCrosshairs = faCrosshairs;
  faEdit = faEdit;
  faTrash = faTrashAlt;

  constructor(
    public droneService: DroneService,
    public mapService: MapService
  ) {}

  ngOnInit(): void {
    this.droneService.updateDrones();
  }
}
