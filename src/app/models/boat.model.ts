import { Position } from './position.model';

export class Boat {
  id: number;
  currentPosition: {
    latitude: number;
    longitude: number;
    altitude: number;
    bearing : number;
  }
}
