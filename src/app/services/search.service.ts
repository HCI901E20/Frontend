import { Injectable } from '@angular/core';
import { Drone, DroneDto } from 'src/app/models/drone.model';
import { map, catchError } from 'rxjs/operators';
import { interval, Subscription, of, Observable, Subject } from 'rxjs';
import { DroneMapper } from '../mappers/drone.mapper';
import { DroneZone, ZoneColors } from '../models/drone-zone.model';
import { ToastrService } from 'ngx-toastr';
import { ApiBaseService } from './api-base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService  {

  constructor(
    protected toastService: ToastrService,
    protected httpClient: HttpClient
  ) {}


  private LaunchService = class LaunchService extends ApiBaseService<string, string> {
    constructor(private parent: SearchService) {
        super(`${environment.api.baseUrl}/search/launch`, parent.httpClient, parent.toastService);
    }

    public launch(): Observable<boolean> {
        const success = new Subject<boolean>();

        this.post('').subscribe(
            (res: string) => {
                if (res != null) {
                    this.toastService.success(res);
                }
                success.next(true);
            },
            (err: any) => {
                success.next(false);
            }
        );

        return success.asObservable();
    }
  };

  private AbortService = class AbortService extends ApiBaseService<string, string> {
    constructor(private parent: SearchService) {
        super(`${environment.api.baseUrl}/search/abort`, parent.httpClient, parent.toastService);
    }

    public abort(): Observable<boolean> {
        const success = new Subject<boolean>();

        this.post('').subscribe(
            (res: string) => {
                if (res != null) {
                    this.toastService.success(res);
                }
                success.next(true);
            },
            (err: any) => {
                success.next(false);
            }
        );

        return success.asObservable();
    }
  };

  public launch(): Observable<boolean> {
    return new this.LaunchService(this).launch();
  }

  public abort(): Observable<boolean> {
    return new this.AbortService(this).abort();
  }
}
