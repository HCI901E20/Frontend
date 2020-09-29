import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DroneOverviewComponent } from './drone-overview/drone-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LivefeedComponent } from './livefeed/livefeed.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DroneOverviewComponent,
    LivefeedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    DroneOverviewComponent,
    LivefeedComponent
  ]
})
export class ComponentsModule { }
