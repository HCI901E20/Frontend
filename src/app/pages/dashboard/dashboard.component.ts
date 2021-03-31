import { Component, HostListener, OnInit } from '@angular/core';
import mapstyle from '../../../assets/mapstyle.json';
import { DroneService } from 'src/app/services/drone.service';
import { MapService } from 'src/app/services/map.service';
import { faCrosshairs, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BoatService } from 'src/app/services/boat.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FeedsService } from 'src/app/services/feeds.service';
import { PersonService } from 'src/app/services/person.service';
import { GoogleMap, MapsEventListener } from '@agm/core/services/google-maps-types';
import { AgmMarker } from '@agm/core';
import { DemoService } from 'src/app/services/demo.service';

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
    public feedsService: FeedsService,
    public personService: PersonService,
    public demoService: DemoService
  ) {}

  ngOnInit(): void {
    this.droneService.updateDrones();
  }

  public click(event: google.maps.PolyMouseEvent) {
    const lat: number = event.latLng.lat();
    const lng: number = event.latLng.lng();

    this.boatService.MoveTo(lat, lng);
    this.demoService.addMapClickToLog(lat, lng);
  }

  public moveHere(marker: AgmMarker) {
    this.boatService.MoveTo(marker.latitude, marker.longitude);
    this.demoService.addMapClickToLog(marker.latitude, marker.longitude);
  }

  public ctrlClick(event): void {
    if (event.domEvent.ctrlKey) {
      this.click(event);
    }
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
