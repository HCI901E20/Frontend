import { Input, Output, EventEmitter } from '@angular/core';
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
  @Output() playerApi = new EventEmitter<VgApiService>();
  constructor() { }

  ngOnInit(): void {
  }

  onPlayerReady(api: VgApiService) {
    console.log("Inside onPlayerReady");
    this.playerApi.emit(api);
  }
}
