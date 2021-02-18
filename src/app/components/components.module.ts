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


@NgModule({
  declarations: [
    HeaderComponent,
    DroneOverviewComponent,
    DroneCardComponent,
    LaunchModalComponent,
    LivefeedsComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    DroneOverviewComponent,
    LivefeedsComponent
  ]
})
export class ComponentsModule { }
