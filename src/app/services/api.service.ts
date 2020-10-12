import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DroneDto } from '../models/drone.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

 /**
  * Gets all drone data from the backend.
  * @returns An Observable of a DroneDto list.
  */
  public getDrones(): Observable<DroneDto[]> {
    return this.httpClient
      .get<DroneDto[]>('https://localhost:5001/api/drones')
      .pipe(
        catchError(error => {
          this.handleServerError(error);
          return throwError(error);
        })
      );
  }

  private handleServerError(error: HttpErrorResponse): void {
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
        errorMessage = 'The request could not be completed due to a conflict with the current state of the target resource.';
        break;
      }
    }
  }
}
