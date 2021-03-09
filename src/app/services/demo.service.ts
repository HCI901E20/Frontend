import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedsService } from './feeds.service';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  constructor(
    protected toastService: ToastrService,
    protected feedsService: FeedsService
  ) {}

  public isDemoLive = false;
  public isDemoStarted = false;
  public btnTxt = toggleDemoBtnTxt[0];

  public toggleStartDemo(): void {
    if (this.isDemoLive) this.pauseDemo();
    else this.startDemo();
  }

  public startDemo(): void {
    this.feedsService.startFeeds();
    this.isDemoLive = true;
    this.isDemoStarted = true;
    this.toastService.success(
      'The demo has successfully started',
      'Demo Started!'
    );
    this.btnTxt = toggleDemoBtnTxt[1];
    console.log('startDemo called');
  }

  public pauseDemo(): void {
    this.feedsService.pauseFeeds();
    this.isDemoLive = false;
    this.toastService.info('The demo has successfully paused', 'Demo Paused!');
    this.btnTxt = toggleDemoBtnTxt[2];
    console.log('pauseDemo called');
  }
}

enum toggleDemoBtnTxt {
  'Start Demo',
  'Pause Demo',
  'Continue Demo',
}
