import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Drone } from 'src/app/models/drone.model';
import { faCrosshairs, faFile, faCamera, faBatteryFull, faMapMarkerAlt, faInfo, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { DroneStatus } from 'src/app/models/drone-status.enum';

@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.component.html',
  styleUrls: ['./drone-card.component.scss']
})
export class DroneCardComponent implements OnInit {
  @Input() inputDrone: Drone;
  faCrosshairs = faCrosshairs;
  faFile = faFile;
  faCamera = faCamera;
  faBatteryFull = faBatteryFull;
  faMapMarker = faMapMarkerAlt;
  faInfo = faInfo;
  faArrows = faArrowsAltV;
  droneStatusString: string;

  constructor() { }

  ngOnInit(): void {
    this.droneStatusString = DroneStatus[this.inputDrone.status].toString();
  }
}
