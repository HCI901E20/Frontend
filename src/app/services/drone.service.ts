import { Injectable } from '@angular/core';
import { Drone, DroneDto } from 'src/app/models/drone.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { DroneMapper } from '../mappers/drone.mapper';
import { DroneZone, ZoneColors } from '../models/drone-zone.model';

@Injectable({
  providedIn: 'root',
})
export class DroneService {
  // The list of drones accessible by the system.
  public droneList: Drone[] = [];
  public droneZones: DroneZone[] = [];
  public selectedDroneId = '';
  public launchModalActive: boolean = false;
  public isSearchLive: boolean = false;
  private usedZoneColors: string[] = [];

  subscription: Subscription;
  source = interval(10000);

  constructor(private apiService: ApiService) {
    // Run updateDrones at the given interval (source).
    this.subscription = this.source.subscribe((val) => this.updateDrones());
    this.updateZones();
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

  public getZoneColorFromUuid(uuid: string): string {
    for (const drone of this.droneZones) {
      if (drone.droneUuid === uuid) {
        return drone.zoneColor;
      }
    }

    return '#858585';
  }

  private getRandomZoneColor(): string {
    for (const color in ZoneColors) {
      if (!this.usedZoneColors.includes(color)) {
        this.usedZoneColors.push(color);
        return ZoneColors[color];
      }
    }
  }

  public updateZones(): void {
    this.droneZones.push({
      droneUuid: 'test1',
      zoneColor: this.getRandomZoneColor(),
      area: [
        {
          lat: 57.0530047355616,
          lng: 9.918189775054937
        },
        {
          lat: 57.0560504891736,
          lng: 9.92136551052857
        },
        {
          lat: 57.05489523273066,
          lng: 9.924541246002203
        },
        {
          lat: 57.05549036932661,
          lng: 9.925270806854254
        },
        {
          lat: 57.05510528203023,
          lng: 9.9271161666565
        },
        {
          lat: 57.050962423680616,
          lng: 9.923468362396246
        },
        {
          lat: 57.0518610547464,
          lng: 9.920807611053473
        },
      ],
      path: [
        {
          lat: 57.054244204977,
          lng: 9.920750783506284
        },
        {
          lat: 57.05361403889979,
          lng: 9.922553227964292
        },
        {
          lat: 57.05308889233257,
          lng: 9.924398587766538
        }
      ]
    });
    this.droneZones.push({
      droneUuid: 'test2',
      zoneColor: this.getRandomZoneColor(),
      area: [
        {
          lat: 57.05504997175444,
          lng: 9.927763159339168
        },
        {
          lat: 57.05077872940066,
          lng: 9.924115355078914
        },
        {
          lat: 57.050136833578975,
          lng: 9.926497156684139
        },
        {
          lat: 57.04985673010699,
          lng: 9.92623966461871
        },
        {
          lat: 57.04912144844144,
          lng: 9.929522688452938
        },
        {
          lat: 57.05391802367947,
          lng: 9.93370693451617
        }
      ],
      path: [
        {
          lat: 57.05263375930009,
          lng: 9.92684476238812
        },
        {
          lat: 57.052225301829054,
          lng: 9.928475545469174
        },
        {
          lat: 57.05191020299586,
          lng: 9.930149243894467
        },
        {
          lat: 57.05180516945729,
          lng: 9.93158690792645
        },
      ]
    });
  }

  public launchSearch(): void {
    this.isSearchLive = true;
    this.launchModalActive = false;
  }

  public recallSearch(): void {
    this.isSearchLive = false;
    this.launchModalActive = false;
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
