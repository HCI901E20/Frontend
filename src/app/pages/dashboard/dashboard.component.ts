import { Component, HostListener, OnInit } from '@angular/core';
import mapstyle from '../../../assets/mapstyle.json';
import { DroneService } from 'src/app/services/drone.service';
import { MapService } from 'src/app/services/map.service';
import { faCrosshairs, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BoatService } from 'src/app/services/boat.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mapstyle = mapstyle;
  faCrosshairs = faCrosshairs;
  faEdit = faEdit;
  faTrash = faTrashAlt;

  private coneLenght = 60;
  private coneAngle = 90;

  constructor(
    public droneService: DroneService,
    public mapService: MapService,
    public boatService: BoatService,
    public feedsService: FeedsService
  ) {}

  ngOnInit(): void {
    this.droneService.updateDrones();
  }

  private degToRad(degress: number): number {
    return degress * (Math.PI / 180);
  }

  private getX(angle: number): number {
    return this.coneLenght * Math.cos(this.degToRad(angle));
  }

  private getY(angle: number): number {
    return this.coneLenght * Math.sin(this.degToRad(angle));
  }

  public getSvgPath(angle: number): string {
    const diff = this.coneAngle/2;

    const x1 = Math.round(this.getX(angle - diff))
    const y1 = Math.round(this.getY(angle - diff))

    const x2 = Math.round(this.getX(angle + diff))
    const y2 = Math.round(this.getY(angle + diff))

    return "M0,-15 " + x1 + "," + (y1 - 15) + " " + x2 + "," + (y2 - 15) + "z";
  }


}
