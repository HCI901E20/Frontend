import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, ObjectUnsubscribedError, Observable } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() source: Observable<String>;
  api: VgApiService;
  constructor() { }

  ngOnInit(): void {
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
  }
}
