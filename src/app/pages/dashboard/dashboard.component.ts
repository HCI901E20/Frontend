import { Component, OnInit } from '@angular/core';
import mapstyle from '../../../assets/mapstyle.json';
import { DroneService } from 'src/app/services/drone.service';
import { MapService } from 'src/app/services/map.service';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mapstyle = mapstyle;
  faCrosshairs = faCrosshairs;
  polygon: any;

  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: true,
      editable: true
    },
    drawingMode: 'polygon'
  };

  getPaths() {
    console.log("get path");
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      let paths = [];
      vertices.getArray().forEach(function (xy, i) {
        // console.log(xy);
        let latLng = {
          lat: xy.lat(),
          lng: xy.lng()
        };
        paths.push(JSON.stringify(latLng));
      });
      return paths;
    }
    return [];
  }

  polygonCreated($event): void {
    if (this.polygon) {
      this.polygon.setMap(null);
    }
    this.polygon = $event;

    console.log(this.getPaths());
  }

  constructor(
    public droneService: DroneService,
    public mapService: MapService
  ) {}

  ngOnInit(): void {
    this.droneService.updateDrones();
  }
}
