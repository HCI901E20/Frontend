import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  private boatPositionSub: BehaviorSubject<Position> = new BehaviorSubject<Position>(this.getPosition());
  public BoatPosition: Observable<Position> = this.boatPositionSub.asObservable();

  private boatOrientationSub: BehaviorSubject<number> = new BehaviorSubject<number>(130);
  public BoatOrientation: Observable<number> = this.boatOrientationSub.asObservable();

  constructor() {
    interval(1000).subscribe(() => this.boatPositionSub.next(this.getPosition()))
  }

  private getPosition(): Position {
    return Object.assign(new Position(), {lat: 57.052078, lng: 9.929658})
  }
  
}
