import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DroneOverviewComponent } from './drone-overview/drone-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DroneCardComponent } from './drone-card/drone-card.component';
import { LaunchModalComponent } from './launch-modal/launch-modal.component';
import { LivefeedsComponent } from './livefeeds/livefeeds.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { ObjectConfirmComponent } from './object-confirm/object-confirm.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DroneOverviewComponent,
    DroneCardComponent,
    LaunchModalComponent,
    LivefeedsComponent,
    VideoPlayerComponent,
    VideoModalComponent,
    ObjectConfirmComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  exports: [
    HeaderComponent,
    DroneOverviewComponent,
    LivefeedsComponent,
    VideoModalComponent,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ObjectConfirmComponent
  ]
})
export class ComponentsModule { }
