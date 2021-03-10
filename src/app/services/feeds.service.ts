import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiBaseService } from './api-base.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

  activeFullscreenSourceSub: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  activeFullscreenSourceObs: Observable<String> = this.activeFullscreenSourceSub.asObservable();

  enlargedVidPathSub: BehaviorSubject<String> = new BehaviorSubject<String>('');
  enlargedVidPathObs: Observable<String> = this.enlargedVidPathSub.asObservable();

  playerApiList: Array<VgApiService> = [];
  enlargedVidApi: VgApiService = new VgApiService();
  fullScreenVidApi: VgApiService = new VgApiService();
  activeFullscreenTime: number = 0;
  public isPredictive: boolean = true;

  constructor(
    protected toastService: ToastrService,
    protected httpClient: HttpClient,
  ) {
    // Setup base api.
    super(`${environment.api.baseUrl}/feed`, httpClient, toastService);

    /*
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

    this.feedsActiveSub.next(startFeeds);
    */
    //this.isPredictive = predictiveToggle;
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
          console.log(this.feedsActiveSub.value);
        }
      );
    });
  }

  public getSubscription(id: string): Observable<string[]> {
    return this.getAllId(id).pipe(
      map((value: string[]) => {
        return value.map((val: string) => {
          return 'http://' + val;
        });
      })
    );
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

  public addFullScreenPlayerApi(api: VgApiService) {
    this.fullScreenVidApi = api;
  }
}
