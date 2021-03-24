import { Component, HostListener, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { take } from 'rxjs/operators';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements OnInit {
  fullscreenPlayerApi: VgApiService;

  constructor(public feedsService: FeedsService) { }

  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "Enter")
      this.onClose()
  }

  ngOnInit(): void {
  }

  onClose() : void {
    this.feedsService.activeFullscreenSourceSub.next(null);
  }

  addFullscreenPlayerApi(api: VgApiService) {
    this.fullscreenPlayerApi = api;
    this.fullscreenPlayerApi.getDefaultMedia().subscriptions.loadedMetadata.pipe(take(1)).subscribe(() => {
      this.fullscreenPlayerApi.play();
    });
  }
}
