export class DroneDto {
  uuid: string;
  lastUpdate: Date;
  currentPosition: {
    uuid: string;
    latitude: number;
    longitude: number;
    altitude: number;
  };
  batteryPercentage: number;
  status: number;
  ip: string;
}

export class Drone {
  uuid: string;
  lastUpdate: Date;
  currentPosition: {
    uuid: string;
    latitude: number;
    longitude: number;
    altitude: number;
  };
  orientation?: number;
  batteryPercentage: number;
  status: number;
  ip: string;
  ui: {
    iconUrl: string;
    statusString: string;
  };
}
