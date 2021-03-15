import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DemoService } from 'src/app/services/demo.service';
import { FeedsService } from 'src/app/services/feeds.service';
import { PredictiveService } from 'src/app/services/predictive.service';

@Component({
  selector: 'app-object-confirm',
  templateUrl: './object-confirm.component.html',
  styleUrls: ['./object-confirm.component.scss'],
})
export class ObjectConfirmComponent implements OnInit {
  public drone: number;

  constructor(
    public feedService: FeedsService,
    public predictiveService: PredictiveService,
    private demoService: DemoService
  ) {
    this.predictiveService.Data.subscribe((index: number) => {
      this.drone = index + 1;
    });
  }

  ngOnInit(): void {}

  public confirm() {
    this.predictiveService.confirmPrediction();
  }

  public ignore() {
    this.demoService.toggleDronePause(this.drone - 1, false);
    this.predictiveService.removePredictive();
  }

  public view() {
    this.predictiveService.Data.pipe(take(1)).subscribe((index: number) => {
      this.feedService.activeFullscreenTime = this.feedService.playerApiList[
        index
      ].currentTime;
      this.feedService.activeFullscreenSourceSub.next(
        this.feedService.feedsActiveSub.value[index]
      );
    });
  }
}
