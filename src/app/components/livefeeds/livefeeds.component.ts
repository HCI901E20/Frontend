import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-livefeeds',
  templateUrl: './livefeeds.component.html',
  styleUrls: ['./livefeeds.component.scss']
})
export class LivefeedsComponent implements OnInit {
  vidPathSub: BehaviorSubject<String> = new BehaviorSubject<String>("https://content.jensoft.dk/Flashbang.mp4");
  vidPathObs: Observable<String> = this.vidPathSub.asObservable();

  constructor() {
  }

  ngOnInit(): void {
    //this.vidPathSub.next("https://content.jensoft.dk/Flashbang.mp4")
  }

}
