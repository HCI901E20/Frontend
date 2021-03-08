import { Injectable } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: Array<string>;

  activeFullscreenSourceSub: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  activeFullscreenSourceObs: Observable<String> = this.activeFullscreenSourceSub.asObservable();
  activeFullscreenTime: number = 0;

  playerApiList: Array<VgApiService> = [];

  constructor() {
    let startfeeds = [
      "http://static.videogular.com/assets/videos/videogular.mp4"
      /*"https://content.jensoft.dk/P10/feed1.mp4",
      "https://content.jensoft.dk/P10/feed2.mp4",
      "https://content.jensoft.dk/P10/feed3.mp4",
      "https://content.jensoft.dk/P10/feed4.mp4",
      "https://content.jensoft.dk/P10/feed5.mp4",
      "https://content.jensoft.dk/P10/feed6.mp4",
      "https://content.jensoft.dk/P10/feed7.mp4",
      "https://content.jensoft.dk/P10/feed8.mp4",*/
    ];

    this.feeds = startfeeds;
  }

  public addPlayerApi(api: VgApiService): void {
    this.playerApiList.push(api);
  }
}
