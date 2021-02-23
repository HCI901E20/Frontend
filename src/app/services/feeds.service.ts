import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: Array<string>;

  constructor() {
    let startfeeds = [
      "https://content.jensoft.dk/P10/feed1.mp4",
      "https://content.jensoft.dk/P10/feed2.mp4",
      "https://content.jensoft.dk/P10/feed3.mp4",
      "https://content.jensoft.dk/P10/feed4.mp4",
      "https://content.jensoft.dk/P10/feed5.mp4",
      "https://content.jensoft.dk/P10/feed6.mp4",
      "https://content.jensoft.dk/P10/feed7.mp4",
      "https://content.jensoft.dk/P10/feed8.mp4",
    ];

    this.feeds = startfeeds;
  }
}
