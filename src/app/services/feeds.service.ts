import { Injectable } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedsService {
  feeds: Array<string>;

  activeFullscreenSourceSub: BehaviorSubject<String> = new BehaviorSubject<String>(
    null
  );
  activeFullscreenSourceObs: Observable<String> = this.activeFullscreenSourceSub.asObservable();
  enlargedVidPathSub: BehaviorSubject<String> = new BehaviorSubject<String>('');
  enlargedVidPathObs: Observable<String> = this.enlargedVidPathSub.asObservable();
  playerApiList: Array<VgApiService> = [];
  enlargedVidApi: VgApiService = new VgApiService();

  activeFullscreenTime: number = 0;

  constructor() {
    let startFeeds = [
      'https://content.jensoft.dk/P10/feed1.mp4',
      'https://content.jensoft.dk/P10/feed2.mp4',
      'https://content.jensoft.dk/P10/feed3.mp4',
      'https://content.jensoft.dk/P10/feed4.mp4',
      'https://content.jensoft.dk/P10/feed5.mp4',
      'https://content.jensoft.dk/P10/feed6.mp4',
      'https://content.jensoft.dk/P10/feed7.mp4',
      'https://content.jensoft.dk/P10/feed8.mp4',
    ];

    this.feeds = startFeeds;
  }

  public startFeeds(): void {
    this.playerApiList.forEach((feed) => {
      feed.play();
    });

    this.enlargedVidApi.play();
  }

  public pauseFeeds(): void {
    this.playerApiList.forEach((feed) => {
      feed.pause();
    });

    this.enlargedVidApi.pause();
  }

  public addPlayerApi(api: VgApiService): void {
    this.playerApiList.push(api);
  }

  public addEnlargedPlayerApi(api: VgApiService) {
    this.enlargedVidApi = api;
  }
}
