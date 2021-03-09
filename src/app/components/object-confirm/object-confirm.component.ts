import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';
import { PredictiveService } from 'src/app/services/predictive.service';

@Component({
  selector: 'app-object-confirm',
  templateUrl: './object-confirm.component.html',
  styleUrls: ['./object-confirm.component.scss']
})
export class ObjectConfirmComponent implements OnInit {

  constructor(private feedService: FeedsService, private predictiveService: PredictiveService) { }

  ngOnInit(): void {
  }

}
