import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public latitude = 57.05208707673086;
  public longitude = 9.940698873107916;

  constructor(private toastService: ToastrService) {}

  public calculateDistance(lat1, lon1, lat2, lon2): number {
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

  public calculateBearing(lat1, lon1, lat2, lon2): number {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const θ = Math.atan2(y, x);
    return Math.round(((θ * 180) / Math.PI + 360) % 360); // in degrees
  }

  public getCoordinate(lat, lng, bearing, distance): Position {
    const R = 6371e3;
    const delta = distance / R;
    bearing = this.toRad(bearing);
    lat = this.toRad(lat);
    lng = this.toRad(lng);

    const lat2 = Math.asin(Math.sin(lat) *  Math.cos(delta) + Math.cos(lat) * Math.sin(delta) * Math.cos(bearing));
    const lng2 = lng + Math.atan2(Math.sin(bearing) * Math.sin(delta) * Math.cos(lat), Math.cos(delta) - Math.sin(lat) * Math.sin(lat2));

    return Object.assign(new Position(), {lat: this.toDeg(lat2), lng: this.toDeg(lng2)});
  }

  private toRad(x: number): number {
    return (Math.PI * x) / 180;
  }

  private toDeg(x: number): number {
    return (x * 180) / Math.PI;
  } 
}
