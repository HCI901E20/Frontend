import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Drone } from 'src/app/models/drone.model';
import { faCrosshairs, faFile, faCamera, faBatteryFull, faMapMarkerAlt, faInfo } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }
}
