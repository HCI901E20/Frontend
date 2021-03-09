import { Injectable } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedsService {
  feeds: Array<string>;
  playerApiList: Array<VgApiService> = [];

  activeFullscreenSourceSub: BehaviorSubject<String> = new BehaviorSubject<String>(
    null
  );
  activeFullscreenSourceObs: Observable<String> = this.activeFullscreenSourceSub.asObservable();
  enlargedVidPathSub: BehaviorSubject<String> = new BehaviorSubject<String>('');
  enlargedVidPathObs: Observable<String> = this.enlargedVidPathSub.asObservable();
  enlargedVidApi: VgApiService = new VgApiService();

  public predictiveApi: VgApiService;
  private predictiveSourceSub: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public predictiveSource: Observable<string> = this.predictiveSourceSub.asObservable();

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
    this.predictiveSourceSub.next(this.feeds[0])
  }

  public setPredictiveSource(index: number) {
    this.predictiveSourceSub.next(this.feeds[index]);
  }

  public startFeeds(): void {
    this.playerApiList.forEach((feed) => {
      feed.play();
    });

    this.enlargedVidApi.play();
    this.predictiveApi?.play();
  }

  public pauseFeeds(): void {
    this.playerApiList.forEach((feed) => {
      feed.pause();
    });

    this.enlargedVidApi.pause();
    this.predictiveApi?.pause();
  }

  public addPlayerApi(api: VgApiService): void {
    this.playerApiList.push(api);
  }

  public addEnlargedPlayerApi(api: VgApiService) {
    this.enlargedVidApi = api;
  }

  public addPredictivePlayerApi(api: VgApiService) {
    this.predictiveApi = api;
  }
}
