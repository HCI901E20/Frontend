import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'app-livefeeds',
  templateUrl: './livefeeds.component.html',
  styleUrls: ['./livefeeds.component.scss']
})
export class LivefeedsComponent implements OnInit {
  enlargedVidPathSub: BehaviorSubject<String> = new BehaviorSubject<String>("");
  enlargedVidPathObs: Observable<String> = this.enlargedVidPathSub.asObservable();

  subjectList: Array<BehaviorSubject<String>> = [];
  obsList: Array<Observable<String>> = [];

  constructor(public feedsService: FeedsService) {
    let i = 0
    feedsService.feeds.forEach(elem => {
      let sub: BehaviorSubject<String> = new BehaviorSubject<String>(elem);
      let obs: Observable<String> = sub.asObservable();

      this.subjectList.push(sub);
      this.obsList.push(obs);
    });

    this.enlargedVidPathSub.next(this.subjectList[0].value)
  }

  ngOnInit(): void {
  }

}
