import { Injectable } from '@angular/core';
import { Drone, DroneDto } from 'src/app/models/drone.model';
import { DroneStatus } from 'src/app/models/drone-status.enum';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { DroneMapper } from '../mappers/drone.mapper';

@Injectable({
  providedIn: 'root'
})
export class DroneService {
  public droneList: Drone[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  public updateDrones(): void {
    this.apiService.getDrones().pipe(map((drones: DroneDto[]) => drones.map((drone: DroneDto) => new DroneMapper().mapDto(drone))))
      .subscribe((data: Drone[]) => {
        this.droneList = data;
    });
  }
}
