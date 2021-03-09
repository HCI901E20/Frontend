import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { Position } from '../models/position.model';
import { PredictiveService } from './predictive.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private lat: number = 57.051703585896625;
  private lng: number = 9.929381038805271;
  private show: boolean = true;

  private ShowSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.show
  );
  public Show: Observable<boolean> = this.ShowSub.asObservable();

  private PositionSub: BehaviorSubject<Position> = new BehaviorSubject<Position>(
    this.getPosition()
  );
  public Position: Observable<Position> = this.PositionSub.asObservable();

  constructor(private predictiveService: PredictiveService) {
    this.predictiveService.ShowPredictive.subscribe((show: boolean) => {
      if (show) {
        interval(1000).subscribe(() =>
          this.PositionSub.next(this.getPosition())
        );
      } else {
        this.show = show;
        this.ShowSub.next(this.show);
      }
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
