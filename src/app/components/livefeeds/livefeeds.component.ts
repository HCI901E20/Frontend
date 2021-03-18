import { Component, HostListener, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FeedsService } from 'src/app/services/feeds.service';
import { PredictiveService } from 'src/app/services/predictive.service';
import { DemoService } from 'src/app/services/demo.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-livefeeds',
  templateUrl: './livefeeds.component.html',
  styleUrls: ['./livefeeds.component.scss'],
})
export class LivefeedsComponent implements OnInit {
  selectedVidIndex = 0;
  hoverVidIndex = NaN;

  subjectList: Array<BehaviorSubject<string>> = [];
  obsList: Array<Observable<string>> = [];
  playerApiList: Array<VgApiService> = [];

  constructor(
    public feedsService: FeedsService,
    public demoService: DemoService,
    protected toastService: ToastrService,
    protected httpClient: HttpClient,
    public predictiveService: PredictiveService
  ) {
    feedsService.feedsActiveObs.subscribe((feedList: string[]) => {
      this.subjectList = [];
      this.obsList = [];
      feedList.forEach((feed: string) => {
        let sub: BehaviorSubject<string> = new BehaviorSubject<string>(feed);
        let obs: Observable<string> = sub.asObservable();

        this.subjectList.push(sub);
        this.obsList.push(obs);
      });
      this.feedsService.enlargedVidPathSub.next(this.subjectList[0]?.value);
      this.feedsService.predictiveVidPathSub.next(this.subjectList[0]?.value);
    });

    this.predictiveService.ShowPredictive.subscribe((show: boolean) => {
      if (show) {
        this.predictiveService.Data.pipe(take(1)).subscribe((index: number) => {
          this.onPlayerClick(index);
        });
      }
    });
  }

  ngOnInit(): void {}

  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case '5': // Down
        this.hoverDown();
        break;
      case '4': // Left
        this.hoverLeft();
        break;
      case '6': // Right
        this.hoverRight();
        break;
      case '8': // Up
        this.hoverUp();
        break;
      case 'Enter': // Select
        this.hoverEnter();
        break;
      case 'p':
        this.demoService.togglePredictive();
        break;
      case 'l': // display logs in console
        this.demoService.displayLogs();
        break;
      case 'i':
        this.predictiveService.toggleIntrusive();
        break;
      case 'r':
        this.demoService.restartDemo();
        break;
      default:
        break;
    }
  }

  private hoverEnter() {
    if (
      Number.isNaN(this.hoverVidIndex) ||
      this.hoverVidIndex == this.selectedVidIndex
    ) {
      this.onPlayerDoubleClick(this.selectedVidIndex);
      this.hoverVidIndex = NaN;
    } else {
      this.onPlayerClick(this.hoverVidIndex);
      this.hoverVidIndex = NaN;
    }
  }

  private hoverLeft() {
    this.setHover();

    if (this.hoverVidIndex == 0)
      this.hoverVidIndex = this.getLastVideoBottomRow();
    else if (this.hoverVidIndex == 1)
      this.hoverVidIndex = this.getLastVideoTopRow();
    else this.hoverVidIndex -= 2;
  }

  private hoverRight() {
    this.setHover();

    if (this.hoverVidIndex == this.getLastVideoBottomRow())
      this.hoverVidIndex = 0;
    else if (this.hoverVidIndex == this.getLastVideoTopRow())
      this.hoverVidIndex = 1;
    else this.hoverVidIndex += 2;
  }

  private hoverUp() {
    this.setHover();

    if (!this.isNumberEqual(this.hoverVidIndex)) this.hoverVidIndex -= 1;
  }

  private hoverDown() {
    this.setHover();

    if (
      this.isNumberEqual(this.hoverVidIndex) &&
      this.hoverVidIndex + 1 < this.feedsService.feedsActiveSub.value.length
    )
      this.hoverVidIndex += 1;
  }

  private setHover() {
    if (Number.isNaN(this.hoverVidIndex))
      this.hoverVidIndex = this.selectedVidIndex;
  }

  private isNumberEqual(x: number): boolean {
    return x % 2 == 0;
  }

  private getLastVideoBottomRow(): number {
    if (this.isNumberEqual(this.feedsService.feedsActiveSub.value.length - 1))
      return this.feedsService.feedsActiveSub.value.length - 2;
    else return this.feedsService.feedsActiveSub.value.length - 1;
  }

  private getLastVideoTopRow(): number {
    if (this.isNumberEqual(this.feedsService.feedsActiveSub.value.length - 2))
      return this.feedsService.feedsActiveSub.value.length - 2;
    else return this.feedsService.feedsActiveSub.value.length - 1;
  }

  onPlayerClick(index: number): void {
    this.feedsService.enlargedVidPathSub.next(this.subjectList[index].value + '?start=' +
      this.feedsService.playerApiList[index].currentTime);

    this.feedsService.enlargedVidApi
    .getDefaultMedia()
    .subscriptions.canPlay.pipe(take(1))
    .subscribe(() => {
      if (this.demoService.isDemoLive)
        this.feedsService.enlargedVidApi.play();
    });
  this.selectedVidIndex = index;
  }

  onPlayerDoubleClick(index: number): void {
    this.feedsService.activeFullscreenSourceSub.next(this.subjectList[index].value + '?start=' +
      this.feedsService.playerApiList[index].currentTime);
  }

  addPlayerApi(api: VgApiService) {
    this.feedsService.playerApiList.push(api);
  }

  addEnlargedPlayerApi(api: VgApiService) {
    this.feedsService.enlargedVidApi = api;
  }

  addFullScreenPlayerApi(api: VgApiService) {
    this.feedsService.fullScreenVidApi = api;
  }
}
