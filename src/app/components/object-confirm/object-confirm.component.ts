import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DemoService } from 'src/app/services/demo.service';
import { FeedsService } from 'src/app/services/feeds.service';
import { LogsService } from 'src/app/services/logs.service';
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
    private demoService: DemoService,
    private logService: LogsService
  ) {
    this.predictiveService.Data.subscribe((index: number) => {
      this.drone = index + 1;
    });
    this.predictiveService.ShowInfoCard.subscribe((val: boolean) => {
      if (val) {
        this.logService.sendLog(
          'Info Card open: ' + this.demoService.getTimestamp()
        );
      }
    });
  }

  ngOnInit(): void {}

  public confirm() {
    this.logService.sendLog(
      'Info Card confirmed: ' + this.demoService.getTimestamp()
    );
    this.predictiveService.confirmPrediction();
  }

  public ignore() {
    this.logService.sendLog(
      'Info Card ignored: ' + this.demoService.getTimestamp()
    );
    this.demoService.toggleDronePause(this.drone - 1, false);
    this.predictiveService.removePredictive();
  }

  public view() {
    this.logService.sendLog(
      'Info Card view: ' + this.demoService.getTimestamp()
    );
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
