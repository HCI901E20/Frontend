import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import mapstyle from '../../../assets/mapstyle.json';
import { Drone } from '../../models/drone.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapstyle = mapstyle;
  drones = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDrones().subscribe((data: Drone[]) => {
      this.drones = data;
    });
  }
}
