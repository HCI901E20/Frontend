import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public latitude = 57.052217;
  public longitude = 9.928468;
  public polygon: any;
  public polygonExists = false;

  controlOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon'],
    },
    polygonOptions: {
      draggable: true,
      editable: true,
      fillOpacity: 0.2,
    },
    polylineOptions: {
      strokeOpacity: 0.5,
    },
    drawingMode: 'polygon',
  };

  constructor(private toastService: ToastrService) {}

  /**
   * Centers the map from given parameters.
   * If none is given, map is centered to default position.
   * @param inputLat The latitude to center the map.
   * @param inputLong The longitude to center the map.
   */
  public centerMap(
    inputLat: number = 57.052217,
    inputLong: number = 9.928468
  ): void {
    this.latitude = inputLat;
    this.longitude = inputLong;
  }

  /**
   * Clears the polygon drawn on the map.
   */
  public clearMap(): void {
    this.polygon.setMap(null);
    this.polygon = null;
    this.polygonExists = false;
  }

  /**
   * Gets a list of coordinates for the polygon
   * @returns A JSON formatted list of (lat, long) tuples.
   */
  public getPolygonPaths(): any[] {
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      const paths = [];
      vertices.getArray().forEach((xy: { lat: () => any; lng: () => any }) => {
        const latLng = {
          lat: xy.lat(),
          lng: xy.lng(),
        };
        paths.push(JSON.stringify(latLng));
      });
      return paths;
    } else {
      return [];
    }
  }

  public saveSearchArea(): void {
    this.clearMap();
    // TODO: Put request

    this.toastService.success(
      'The search area has been successfully updated!',
      'Success'
    );
  }

  public calulateDistance(lat1, lon1, lat2, lon2): number {
    const R = 6371e3; // earth mean radius
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c); // in metres
  }

  public calulateBearing(lat1, lon1, lat2, lon2): number {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const θ = Math.atan2(y, x);
    return Math.round(((θ * 180) / Math.PI + 360) % 360); // in degrees
  }
}
