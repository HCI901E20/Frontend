import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable} from 'rxjs';
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
        throw error;
      })
    );
  }

  getAllId(id: ID): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiUrl + '/' + id).pipe(
      catchError((error) => {
        this.handleServerError(error);
        throw error;
      })
    );
  }

  putDronePause(id: ID, pause: boolean): Observable<boolean> {
    return this.httpClient.put<boolean>(this.apiUrl + '/' + id + '/' + pause, null).pipe(
      catchError((error) => {
        this.handleServerError(error);
        throw error;
      })
    );
  }

  get(id: ID): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + '/' + id).pipe(
      catchError((error) => {
        this.handleServerError(error);
        throw error;
      })
    );
  }

  post(t: T): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl, t).pipe(
      catchError((error) => {
        this.handleServerError(error);
        throw error;
      })
    );
  }

  put(id: ID, t: T): Observable<T> {
    return this.httpClient.put<T>(this.apiUrl + '/' + id, t).pipe(
      catchError((error) => {
        this.handleServerError(error);
        throw error;
      })
    );
  }

  delete(id: ID): Observable<any> {
    return this.httpClient.delete<T>(this.apiUrl + '/' + id).pipe(
      catchError((error) => {
        this.handleServerError(error);
        throw error;
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
      case 406: {
        errorTitle = '406 - Not Acceptable';
        errorMessage = error.error;
        break;
      }
      default: {
        errorTitle = 'Server error';
        errorMessage = 'Something went wrong..';
        break;
      }
    }
    this.toastService.error(errorMessage, errorTitle);
  }
}
