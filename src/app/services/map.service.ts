import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public latitude = 57.052217;
  public longitude = 9.928468;
  public polygon: any;
  public polygonExists = false;

  controlOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: true,
      editable: true,
      fillOpacity: 0.2
    },
    polylineOptions: {
      strokeOpacity: 0.5
    },
    drawingMode: 'polygon'
  };

  constructor(private toastService: ToastrService) { }

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
      vertices.getArray().forEach((xy: { lat: () => any; lng: () => any; }) => {
          const latLng = {
            lat: xy.lat(),
            lng: xy.lng()
          };
          paths.push(JSON.stringify(latLng));
        });
      return paths;
    }
    else {
      return [];
    }
  }

  public saveSearchArea(): void {
    this.clearMap();
    // TODO: Put request

    this.toastService.success('The search area has been successfully updated!', 'Success');
  }
}
