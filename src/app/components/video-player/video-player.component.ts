import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PredictiveService } from 'src/app/services/predictive.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() source: Observable<String>;
  @Output()
  playerApi: EventEmitter<VgApiService> = new EventEmitter<VgApiService>();

  constructor(private pred: PredictiveService) {}

  ngOnInit(): void {}

  onPlayerReady(api: VgApiService) {
    this.playerApi.emit(api);

    this.source.pipe(take(1)).subscribe((url: string) => {
      if (url?.includes('out')) {
        interval(100).subscribe(() => {
          if (
            api.currentTime < this.pred.TIMESTAMP + 0.5 &&
            api.currentTime >= this.pred.TIMESTAMP
          )
            this.pred.enablePredictive(url);
        });
      }
    });
  }
}
