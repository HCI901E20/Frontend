import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService extends ApiBaseService<{content: string}, string>{

  constructor(protected httpClient: HttpClient, protected toastService: ToastrService) {
    super(`${environment.api.baseUrl}/logs`, httpClient, toastService);
  }

  public sendLog(msg: string): void {
    this.post({content: msg}).toPromise().then();
  }
}
