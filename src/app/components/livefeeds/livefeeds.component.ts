import { Component, HostListener, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FeedsService } from 'src/app/services/feeds.service';
import { PersonService } from 'src/app/services/person.service';
import { PredictiveService } from 'src/app/services/predictive.service';

@Component({
  selector: 'app-livefeeds',
  templateUrl: './livefeeds.component.html',
  styleUrls: ['./livefeeds.component.scss'],
})
export class LivefeedsComponent implements OnInit {
  selectedVidIndex = 0;
  hoverVidIndex = NaN;

  subjectList: Array<BehaviorSubject<String>> = [];
  obsList: Array<Observable<String>> = [];
  playerApiList: Array<VgApiService> = [];

  constructor(public feedsService: FeedsService, private predictiveService: PredictiveService) {
    feedsService.feeds.forEach((elem) => {
      let sub: BehaviorSubject<String> = new BehaviorSubject<String>(elem);
      let obs: Observable<String> = sub.asObservable();

      this.subjectList.push(sub);
      this.obsList.push(obs);
    });

    this.predictiveService.ShowPredictive.subscribe((show: boolean) => {
      if (show) {
        this.predictiveService.Data.pipe(take(1)).subscribe((index: number) => {
          this.onPlayerClick(index);
        })
      }
    })

    this.feedsService.enlargedVidPathSub.next(this.subjectList[0].value);
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
      this.hoverVidIndex + 1 < this.feedsService.feeds.length
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
    if (this.isNumberEqual(this.feedsService.feeds.length - 1))
      return this.feedsService.feeds.length - 2;
    else return this.feedsService.feeds.length - 1;
  }

  private getLastVideoTopRow(): number {
    if (this.isNumberEqual(this.feedsService.feeds.length - 2))
      return this.feedsService.feeds.length - 2;
    else return this.feedsService.feeds.length - 1;
  }

  onPlayerClick(index: number): void {
    this.feedsService.enlargedVidPathSub.next(this.subjectList[index].value);
    this.feedsService.enlargedVidApi
      .getDefaultMedia()
      .subscriptions.canPlay.pipe(take(1))
      .subscribe(() => {
        this.feedsService.enlargedVidApi.currentTime = this.feedsService.playerApiList[
          index
        ].currentTime;
        this.feedsService.enlargedVidApi.play();
      });
    this.selectedVidIndex = index;
  }

  onPlayerDoubleClick(index: number): void {
    //this.feedsService.activeFullscreenTime = this.playerApiList[index].currentTime;
    this.feedsService.activeFullscreenTime = this.feedsService.playerApiList[
      index
    ].currentTime;
    this.feedsService.activeFullscreenSourceSub.next(
      this.subjectList[index].value
    );
  }

  addPlayerApi(api: VgApiService) {
    this.feedsService.playerApiList.push(api);
  }

  addEnlargedPlayerApi(api: VgApiService) {
    this.feedsService.enlargedVidApi = api;
  }
}
