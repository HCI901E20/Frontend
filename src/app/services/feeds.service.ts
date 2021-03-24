import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiBaseService } from './api-base.service';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedsService extends ApiBaseService<string, string> {
  feedsActiveSub: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  feedsActiveObs: Observable<string[]> = this.feedsActiveSub.asObservable();

  feedsPredictiveSub: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  feedsPredictiveObs: Observable<string[]> = this.feedsPredictiveSub.asObservable();

  feedsNonPredictiveSub: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  feedsNonPredictiveObs: Observable<string[]> = this.feedsNonPredictiveSub.asObservable();

  activeFullscreenSourceSub: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  activeFullscreenSourceObs: Observable<String> = this.activeFullscreenSourceSub.asObservable();

  enlargedVidPathSub: BehaviorSubject<string> = new BehaviorSubject<string>('');
  enlargedVidPathObs: Observable<string> = this.enlargedVidPathSub.asObservable();

  predictiveVidPathSub: BehaviorSubject<string> = new BehaviorSubject<string>('');
  predictiveVidPathObs: Observable<string> = this.predictiveVidPathSub.asObservable();

  playerApiList: Array<VgApiService> = [];
  enlargedVidApi: VgApiService = new VgApiService();
  fullScreenVidApi: VgApiService = new VgApiService();
  predictiveApi: VgApiService = new VgApiService();
  activeFullscreenTime: number = 0;
  public isPredictive: boolean = true;

  constructor(
    protected toastService: ToastrService,
    protected httpClient: HttpClient,
  ) {
    // Setup base api.
    super(`${environment.api.baseUrl}/feed`, httpClient, toastService);


    /* let startFeeds = [
      '/assets/videos/Drone1.mp4',
      '/assets/videos/Drone2.mp4',
      '/assets/videos/Drone3.mp4',
      '/assets/videos/Drone4.mp4',
      '/assets/videos/Drone5.mp4',
      '/assets/videos/Drone6.mp4',
      '/assets/videos/Drone7.mp4',
      '/assets/videos/Drone8.mp4',
    ];

    this.feedsActiveSub.next(startFeeds); */

    this.getFeeds();
  }

  public getFeeds(): void {
    this.getSubscription('true').subscribe((predictiveFeeds: string[]) => {
      this.feedsPredictiveSub.next(predictiveFeeds);
      this.getSubscription('false').subscribe(
        (nonPredictiveFeeds: string[]) => {
          this.feedsNonPredictiveSub.next(nonPredictiveFeeds);
          if (this.isPredictive)
            this.feedsActiveSub.next(this.feedsPredictiveSub.value);
          else
            this.feedsActiveSub.next(this.feedsNonPredictiveSub.value);
        }
      );
    });
  }

  public getSubscription(id: string): Observable<string[]> {
    return this.getAllId(id);
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
    this.predictiveApi.subscriptions.canPlay.pipe(take(1)).subscribe(() => {
      this.predictiveApi.play();
    })
  }

  public addFullScreenPlayerApi(api: VgApiService) {
    this.fullScreenVidApi = api;
  }

  public setPredictiveSource(index: number) {
    this.predictiveVidPathSub.next(this.feedsActiveSub.value[index]);
  }
}
