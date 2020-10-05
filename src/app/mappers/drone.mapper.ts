import { DroneDto, Drone } from 'src/app/models/drone.model';
import { DroneStatus } from '../models/drone-status.enum';

export class DroneMapper {
  public mapDto(dto: DroneDto): Drone {
    const drone: Drone = new Drone();

    drone.uuid = dto.uuid;
    drone.ip = dto.ip;
    drone.status = dto.status;
    drone.lastUpdate = dto.lastUpdate;
    drone.currentPosition = dto.currentPosition;
    drone.batteryPercentage = dto.batteryPercentage;
    drone.ui = {
      statusString: DroneStatus[dto.status].toString(),
      iconUrl: '/assets/icons/drone_icon_' + DroneStatus[dto.status].toString() + '.svg',
    };

    return drone;
  }
}
