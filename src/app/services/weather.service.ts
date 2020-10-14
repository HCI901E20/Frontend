import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends ApiBaseService<any, any> {
  constructor(
    protected toastService: ToastrService,
    protected httpClient: HttpClient
  ) {
    // Setup base api.
    super('', httpClient, toastService);
  }
}
