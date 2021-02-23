import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})

export class VideoPlayerComponent implements OnInit {
  @Input() source: Observable<String>;
  @Output() playerApi: EventEmitter<VgApiService> = new EventEmitter<VgApiService>();

  constructor() { }

  ngOnInit(): void {
  }

  onPlayerReady(api: VgApiService) {
    this.playerApi.emit(api);
  }
}
