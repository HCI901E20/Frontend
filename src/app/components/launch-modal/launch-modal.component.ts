import { Component, OnInit } from '@angular/core';
import { DroneService } from 'src/app/services/drone.service';

@Component({
  selector: 'app-launch-modal',
  templateUrl: './launch-modal.component.html',
  styleUrls: ['./launch-modal.component.scss']
})
export class LaunchModalComponent implements OnInit {

  constructor(public droneService: DroneService) { }

  ngOnInit(): void {
  }

}
