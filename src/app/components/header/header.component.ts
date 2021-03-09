import { Component, OnInit } from '@angular/core';
import { DroneService } from 'src/app/services/drone.service';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public droneService: DroneService,
    public demoService: DemoService
  ) {}

  ngOnInit(): void {}
}
