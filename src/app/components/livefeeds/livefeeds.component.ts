import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'app-livefeeds',
  templateUrl: './livefeeds.component.html',
  styleUrls: ['./livefeeds.component.scss']
})

export class LivefeedsComponent implements OnInit {
  enlargedVidPathSub: BehaviorSubject<String> = new BehaviorSubject<String>("");
  enlargedVidPathObs: Observable<String> = this.enlargedVidPathSub.asObservable();
  enlargedVidApi: VgApiService = new VgApiService();

  selectedVidIndex = 0;

  subjectList: Array<BehaviorSubject<String>> = [];
  obsList: Array<Observable<String>> = [];
  playerApiList: Array<VgApiService> = [];

  constructor(public feedsService: FeedsService) {
    feedsService.feeds.forEach(elem => {
      let sub: BehaviorSubject<String> = new BehaviorSubject<String>(elem);
      let obs: Observable<String> = sub.asObservable();

      this.subjectList.push(sub);
      this.obsList.push(obs);
    });

    this.enlargedVidPathSub.next(this.subjectList[0].value);
  }

  ngOnInit(): void {
  }

  onPlayerClick(index: number): void {
    this.enlargedVidPathSub.next(this.subjectList[index].value);
    this.enlargedVidApi.getDefaultMedia().subscriptions.canPlay.pipe(take(1)).subscribe(() => {
      this.enlargedVidApi.currentTime = this.playerApiList[index].currentTime;
    })
    this.selectedVidIndex = index;
  }

  onPlayerDoubleClick(index: number): void {
    this.feedsService.activeFullscreenTime = this.playerApiList[index].currentTime;
    this.feedsService.activeFullscreenSourceSub.next(this.subjectList[index].value);
  }

  addPlayerApi(api: VgApiService) {
    this.playerApiList.push(api);
  }

  addEnlargedPlayerApi(api: VgApiService) {
    this.enlargedVidApi = api;
  }
}
