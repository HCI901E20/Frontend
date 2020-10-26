import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DroneZone } from '../models/drone-zone.model';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends ApiBaseService<DroneZone, string> {

  constructor(
    protected toastService: ToastrService,
    protected httpClient: HttpClient
  ) {
    // Setup base api.
    super(`${environment.api.baseUrl}/search`, httpClient, toastService);
   }
}
