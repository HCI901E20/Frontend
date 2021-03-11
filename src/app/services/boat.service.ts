import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Position } from '../models/position.model';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  private position: Position = {lat: 57.049356121182555, lng: 9.940183888977057};
  private ms: number = 10;

  private update: Observable<number> = interval(1000);

  private boatPositionSub: BehaviorSubject<Position> = new BehaviorSubject<Position>(this.getPosition());
  public BoatPosition: Observable<Position> = this.boatPositionSub.asObservable();

  private boatOrientationSub: BehaviorSubject<number> = new BehaviorSubject<number>(130);
  public BoatOrientation: Observable<number> = this.boatOrientationSub.asObservable();

  private movementSub: Subscription;


  constructor(private mapService: MapService) {
    this.update.subscribe(() => this.boatPositionSub.next(this.getPosition()));
  }

  private getPosition(): Position {
    return this.position;
  }

  public MoveTo(lat: number, lng: number): void {
    this.movementSub?.unsubscribe();
    const distance = this.mapService.calculateDistance(this.position.lat, this.position.lng, lat, lng);
    const steps = distance / this.ms;    

    this.movementSub = this.update.pipe(take(steps)).subscribe(() => {
      const bearing = this.mapService.calculateBearing(this.position.lat, this.position.lng, lat, lng);
      this.boatOrientationSub.next(bearing - 90);

      this.position = this.mapService.getCoordinate(this.position.lat, this.position.lng, bearing, this.ms);     
    });
  }
  
}
