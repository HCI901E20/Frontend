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
  }

  public pauseDemo(): void {
    this.feedsService.pauseFeeds();
    this.isDemoLive = false;
    this.toastService.info('The demo has successfully paused', 'Demo Paused!');
    this.btnTxt = toggleDemoBtnTxt[2];
  }

  public restartDemo(): void {
    this.isDemoLive = false;
    this.isDemoStarted = false;
    this.btnTxt = toggleDemoBtnTxt[0];

    this.feedsService.isPredictive = !this.feedsService.isPredictive;
    this.feedsService.getFeeds();
    
    if(this.feedsService.isPredictive)
      this.toastService.success('The demo has successfully switched to predictive mode');
    else 
      this.toastService.success('The demo has successfully switched to non predictive mode');
  }
}

enum toggleDemoBtnTxt {
  'Start Demo',
  'Pause Demo',
  'Continue Demo',
}
