import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss']
})
export class LivefeedComponent implements OnInit {
  faVideo = faVideo;

  constructor(
    public sidebarService: SidebarService
    ) {}

  ngOnInit(): void {
  }

}
