export interface Drone {
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
