import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: Array<string>;

  constructor() {
    let startfeeds = [
      "http://static.videogular.com/assets/videos/videogular.mp4",
      "http://static.videogular.com/assets/videos/videogular.mp4",
      "http://static.videogular.com/assets/videos/videogular.mp4",
      "http://static.videogular.com/assets/videos/videogular.mp4",
      "http://static.videogular.com/assets/videos/videogular.mp4",
      "http://static.videogular.com/assets/videos/videogular.mp4",
      "http://static.videogular.com/assets/videos/videogular.mp4",
      "http://static.videogular.com/assets/videos/videogular.mp4",
    ];

    this.feeds = startfeeds;
  }
}
