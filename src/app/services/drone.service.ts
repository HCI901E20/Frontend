import { Injectable } from '@angular/core';
import { Drone, DroneDto } from 'src/app/models/drone.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { DroneMapper } from '../mappers/drone.mapper';

@Injectable({
  providedIn: 'root',
})
export class DroneService {
  // The list of drons accessible by the system.
  public droneList: Drone[] = [];
  subscription: Subscription;
  source = interval(10000);

  constructor(private apiService: ApiService) {
    // Run updateDrones at the given interval (source).
    this.subscription = this.source.subscribe((val) => this.updateDrones());
  }

  /**
   * Updates the drone list from the database.
   * Maps all the data from DroneDta to a Drone model.
   */
  public updateDrones(): void {
    this.apiService
      .getDrones()
      .pipe(
        map((drones: DroneDto[]) =>
          drones.map((drone: DroneDto) => new DroneMapper().mapDto(drone))
        )
      )
      .subscribe((data: Drone[]) => {
        this.droneList = data;
      });
  }

  /**
   * @param status The status of the drone.
   * @returns      A CSS class with the correct color for the status.
   */
  public getDroneColor(status: number): string {
    switch (status) {
      case 0:
      case 1:
        return 'drone-status-idle';
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 'drone-status-active';
      case 440:
        return 'drone-status-error';
    }
  }

  /**
   * @param status The status of the drone.
   * @returns      A CSS class with the correct color for the status icon.
   */
  public getDroneIconColor(status: number): string {
    switch (status) {
      case 0:
      case 1:
        return 'drone-status-idle-icon';
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 'drone-status-active-icon';
      case 440:
        return 'drone-status-error-icon';
    }
  }

  /**
   * @param status The status of the drone.
   * @returns      A boolean describing if the livefeed should be inaccessible.
   */
  public isLivefeedDisabled(status: number): boolean {
    switch (status) {
      case 0:
      case 1:
        return true;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return false;
      case 440:
        return true;
    }
  }
}
