import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { Position } from '../models/position.model';
import { DroneService } from './drone.service';
import { MapService } from './map.service';
import { PredictiveService } from './predictive.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private lat: number = 0;
  private lng: number = 0;
  private show: boolean = false;

  private ShowSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.show
  );
  public Show: Observable<boolean> = this.ShowSub.asObservable();

  private PositionSub: BehaviorSubject<Position> = new BehaviorSubject<Position>(
    this.getPosition()
  );
  public Position: Observable<Position> = this.PositionSub.asObservable();

  constructor(
    private predictiveService: PredictiveService,
    private droneService: DroneService,
    private mapService: MapService
  ) {
    this.predictiveService.ShowPredictive.subscribe((show: boolean) => {
      if (show) {
        interval(1000).subscribe(() =>
          this.PositionSub.next(this.getPosition())
        );
      }
      this.show = show;
      this.ShowSub.next(this.show);
    });

    this.predictiveService.Data.subscribe((index: number) => {
      if (!index) return;

      const lat = this.droneService.droneList[index].currentPosition.latitude;
      const lng = this.droneService.droneList[index].currentPosition.longitude;
      const dBearing = this.droneService.droneList[index].currentPosition.bearing;

      const max = dBearing + 90 / 2;
      const min = dBearing - 90 / 2;

      const bearing = Math.floor(Math.random() * (max - min + 1) + min);

      const pos = this.mapService.getCoordinate(lat, lng, bearing, 30);

      this.setPosition(pos.lat, pos.lng);
    });
  }

  private getPosition(): Position {
    return Object.assign(new Position(), { lat: this.lat, lng: this.lng });
  }

  public setPosition(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  public togglePerson() {
    this.show = !this.Show;
    this.ShowSub.next(this.show);
  }
}
