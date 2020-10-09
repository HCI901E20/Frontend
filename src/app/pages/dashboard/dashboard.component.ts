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

  /**
   * An event listener for the polygonCreated event of the agm-drawing-manager.
   * @param event The newly created polygon.
   */
  public polygonCreated(event: any): void {
    // If a polygon already exists, clear the existing polygon from the map.
    if (this.mapService.polygon) {
      this.mapService.polygon.setMap(null);
    }

    // Save new polygon in the map service.
    this.mapService.polygon = event;
  }

  constructor(
    public droneService: DroneService,
    public mapService: MapService
  ) {}

  ngOnInit(): void {
    this.droneService.updateDrones();
  }
}
