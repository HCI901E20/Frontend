import { Observable } from 'rxjs';

export interface ApiBaseInterface<T, ID> {
  getAll(): Observable<T[]>;
  get(id: ID): Observable<T>;
  post(t: T): Observable<T>;
  put(id: ID, t: T): Observable<T>;
  delete(id: ID): Observable<any>;
}
