import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TickService {

  public UpdateClock: Observable<Number> = interval(1000)

  constructor() { }
}
