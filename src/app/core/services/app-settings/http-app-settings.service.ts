import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpAppSettingsService {

  private readonly URL = ' http://localhost:3000/settings';

  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<any> {
    return this.http.get(this.URL).pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  private handlerError(err): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err);
  }


}
