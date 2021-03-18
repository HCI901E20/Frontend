import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeedsService } from './feeds.service';

@Injectable({
  providedIn: 'root'
})
export class PredictiveService {
  private TriggerSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private DataSub: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private ShowInfoCardSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private IntrusiveSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public ShowPredictive: Observable<boolean> = this.TriggerSub.asObservable();
  public Data: Observable<number> = this.DataSub.asObservable();
  public ShowInfoCard: Observable<boolean> = this.ShowInfoCardSub.asObservable();
  public Intrusive: Observable<boolean> = this.IntrusiveSub.asObservable();

  private block: boolean = false;

  public TIMESTAMP: number = 10.10

  constructor(private feedService: FeedsService) {

  }

  public enablePredictive(data: string = '') {
    if (!this.block) {
      this.block = true;
      setTimeout(() => { this.block = false; }, 1000);
      this.DataSub.next(this.feedService.feedsActiveSub.value.indexOf(data));
      this.feedService.setPredictiveSource(this.feedService.feedsActiveSub.value.indexOf(data));
      this.TriggerSub.next(true);
      this.ShowInfoCardSub.next(true);
    }
  }

  public removePredictive() {
    this.TriggerSub.next(false);
    this.ShowInfoCardSub.next(false);
    this.DataSub.next(NaN);
  }

  public confirmPrediction() {
    this.ShowInfoCardSub.next(false);
  }

  public toggleIntrusive(): void {
    this.IntrusiveSub.next(!this.IntrusiveSub.value);
  }
}
