import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-drone-overview',
  templateUrl: './drone-overview.component.html',
  styleUrls: ['./drone-overview.component.scss']
})
export class DroneOverviewComponent implements OnInit {
  faBars = faBars;

  constructor(
    public sidebarService: SidebarService
    ) {}

  ngOnInit(): void {
  }

}
