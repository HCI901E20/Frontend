import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiBaseInterface } from './api-base.interface';

export abstract class ApiBaseService<T, ID> implements ApiBaseInterface<T, ID> {
  constructor(
    private apiUrl: string,
    protected httpClient: HttpClient,
    protected toastService: ToastrService
  ) {}

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiUrl).pipe(
      catchError((error) => {
        this.handleServerError(error);
        return EMPTY;
      })
    );
  }

  get(id: ID): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + '/' + id).pipe(
      catchError((error) => {
        this.handleServerError(error);
        return EMPTY;
      })
    );
  }

  post(t: T): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl, t).pipe(
      catchError((error) => {
        this.handleServerError(error);
        return EMPTY;
      })
    );
  }

  put(id: ID, t: T): Observable<T> {
    return this.httpClient.put<T>(this.apiUrl + '/' + id, t).pipe(
      catchError((error) => {
        this.handleServerError(error);
        return EMPTY;
      })
    );
  }

  delete(id: ID): Observable<any> {
    return this.httpClient.delete<T>(this.apiUrl + '/' + id).pipe(
      catchError((error) => {
        this.handleServerError(error);
        return EMPTY;
      })
    );
  }

  handleServerError(error: HttpErrorResponse): void {
    let errorTitle: string;
    let errorMessage: string;

    switch (error.status) {
      case 404: {
        errorTitle = '404 - Not found';
        errorMessage = 'The resource was not found on the server.';
        break;
      }
      case 400: {
        errorTitle = '400 - Bad request';
        errorMessage = 'The request was not formatted correctly.';
        break;
      }
      case 409: {
        errorTitle = '409 - Conflict';
        errorMessage =
          'The request could not be completed due to a conflict with the current state of the target resource.';
        break;
      }
    }
    this.toastService.error(errorMessage, errorTitle);
  }
}
