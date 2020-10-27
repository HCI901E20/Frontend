import { Injectable } from '@angular/core';
import { Drone, DroneDto } from 'src/app/models/drone.model';
import { map } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { DroneMapper } from '../mappers/drone.mapper';
import { DroneZone, ZoneColors } from '../models/drone-zone.model';
import { ToastrService } from 'ngx-toastr';
import { ApiBaseService } from './api-base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ZoneService } from './zone.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class DroneService extends ApiBaseService<Drone, string> {
  // The list of drones accessible by the system.
  public droneList: Drone[] = [];
  public droneZones: DroneZone[] = [];
  public selectedDroneId = '';
  public launchModalActive = false;
  public isSearchLive = false;
  private usedZoneColors: string[] = [];

  subscription: Subscription;
  source = interval(10000);

  constructor(
    protected toastService: ToastrService,
    protected httpClient: HttpClient,
    protected zoneService: ZoneService,
    protected mapService: MapService
  ) {
    // Setup base api.
    super(`${environment.api.baseUrl}/drones`, httpClient, toastService);

    // Run updateDrones at the given interval (source).
    this.subscription = this.source.subscribe((val) => this.updateDrones());
  }

  /**
   * Updates the drone list from the database.
   * Maps all the data from DroneDta to a Drone model.
   */
  public updateDrones(): void {
    this.getAll()
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
    if (this.usedZoneColors.length === 6) {
      this.usedZoneColors = [];
    }

    for (const color in ZoneColors) {
      if (!this.usedZoneColors.includes(color)) {
        this.usedZoneColors.push(color);
        return ZoneColors[color];
      }
    }
  }

  public updateZones(): void {
    // Get polygon points.
    const polygon = this.mapService.getPolygonPaths();

    this.zoneService.post(polygon).subscribe((res) => {
      this.droneZones = res;
      for (const zone of this.droneZones) {
        zone.zoneColor = this.getRandomZoneColor();
      }
    });
    this.mapService.clearMap();
    this.toastService.success('The search area has been successfully updated!', 'Success');
  }

  public launchSearch(): void {
    this.isSearchLive = true;
    this.launchModalActive = false;

    this.toastService.success('Your search has successfully started!', 'Drones Launched');
  }

  public recallSearch(): void {
    this.isSearchLive = false;
    this.launchModalActive = false;

    this.toastService.info('Your search has successfully been recalled!', 'Drones Recalled');
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
