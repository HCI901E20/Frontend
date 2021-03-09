import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeedsService } from './feeds.service';

@Injectable({
  providedIn: 'root'
})
export class PredictiveService {
  private TriggerSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private DataSub: BehaviorSubject<number> = new BehaviorSubject<number>(NaN);
  public ShowPredictive: Observable<boolean> = this.TriggerSub.asObservable();
  public Data: Observable<number> = this.DataSub.asObservable();

  private block: boolean = false;

  public TIMESTAMP:number = 10.10

  constructor(private feedService: FeedsService) {

  }

  public enablePredictive(data: string = '') {
    if (!this.block) {
      this.TriggerSub.next(true);
      this.DataSub.next(this.feedService.feeds.indexOf(data));
      this.block = true;
      setTimeout(() => {this.block = false},1000);
    }
  }

  public removePredictive() {
    this.TriggerSub.next(false);
    this.DataSub.next(NaN);
  }
}
