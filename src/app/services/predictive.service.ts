import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeedsService } from './feeds.service';

@Injectable({
  providedIn: 'root'
})
export class PredictiveService {
  private TriggerSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private DataSub: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private ShowInfoCardSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public ShowPredictive: Observable<boolean> = this.TriggerSub.asObservable();
  public Data: Observable<number> = this.DataSub.asObservable();
  public ShowInfoCard: Observable<boolean> = this.ShowInfoCardSub.asObservable();

  private block: boolean = false;

  public TIMESTAMP:number = 10.10

  constructor(private feedService: FeedsService) {

  }

  public enablePredictive(data: string = '') {
    if (!this.block) {
      this.block = true;
      setTimeout(() => {this.block = false},1000);
      this.feedService.setPredictiveSource(this.feedService.feeds.indexOf(data))
      this.TriggerSub.next(true);
      this.ShowInfoCardSub.next(true);
      this.DataSub.next(this.feedService.feeds.indexOf(data));
      this.feedService
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
}
