export class DroneZone {
  droneUuid: string;
  zoneColor: string;
  area: Position[];
  path: Position[];
}

export class Position {
  lat: number;
  lng: number;
}

export enum ZoneColors {
  red = '#DD2429',
  green = '#31753d',
  purple = '#993299',
  orange = '#FFB732',
  greenBlue = '#1b7572',
  pink = '#634354',
}
