import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public latitude = 57.052217;
  public longitude = 9.928468;
  public polygon: any;

  constructor() { }

  /**
   * Centers the map from given parameters.
   * If none is given, map is centered to default position.
   * @param inputLat The latitude to center the map.
   * @param inputLong The longitude to center the map.
   */
  public centerMap(inputLat: number = 57.052217, inputLong: number = 9.928468): void {
    this.latitude = inputLat;
    this.longitude = inputLong;
  }
}
