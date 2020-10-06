import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Drone } from 'src/app/models/drone.model';
import {
  faCrosshairs,
  faFile,
  faCamera,
  faBatteryFull,
  faMapMarkerAlt,
  faInfo,
  faArrowsAltV,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { DroneStatus } from 'src/app/models/drone-status.enum';
import { DroneService } from 'src/app/services/drone.service';

@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.component.html',
  styleUrls: ['./drone-card.component.scss'],
})
export class DroneCardComponent implements OnInit {
  @Input() inputDrone: Drone;
  @Input() inputIndex: number;

  faCrosshairs = faCrosshairs;
  faFile = faFile;
  faCamera = faCamera;
  faBatteryFull = faBatteryFull;
  faMapMarker = faMapMarkerAlt;
  faInfo = faInfo;
  faArrows = faArrowsAltV;
  faCircle = faCircle;
  droneStatusString: string;

  constructor(public droneService: DroneService) {}

  ngOnInit(): void {
    this.droneStatusString = DroneStatus[this.inputDrone.status].toString();
  }

  /**
   * Function to format the time difference since last update.
   * @returns The time differnce since last update in the correct format.
   */
  public getLastUpdate(): string {
    const currentDate = new Date();
    const lastUpdate = new Date(this.inputDrone.lastUpdate);

    const difference = Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
      ) -
        Date.UTC(
          lastUpdate.getFullYear(),
          lastUpdate.getMonth(),
          lastUpdate.getDate(),
          lastUpdate.getHours(),
          lastUpdate.getMinutes(),
          lastUpdate.getSeconds(),
        )) / 1000
    );

    // Days.
    if ((difference / (60 * 60 * 24)) > 1) {
      return Math.floor(difference / (60 * 60 * 24)) + ' days';
    }
    // Hours.
    else if ((difference / (60 * 60)) > 1) {
      return Math.floor(difference / (60 * 60)) + ' hours';
    }
    // Minutes.
    else if ((difference / 60) > 1) {
      return Math.floor((difference / 60)) + ' min';
    }
    // Seconds.
    else {
      return Math.floor(difference) + ' sec';
    }
  }
}
