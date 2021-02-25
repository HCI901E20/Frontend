import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { DroneService } from 'src/app/services/drone.service';
import { FeedsService } from 'src/app/services/feeds.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public droneService: DroneService, public feedservice: FeedsService) { }

  ngOnInit(): void {
  }

  public startDemo(): void {
  }

}
