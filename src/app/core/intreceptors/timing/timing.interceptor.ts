import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpEventType, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {

  constructor(private filtres = []) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const {url} = request;
    const isUseTiming = this.filtres.some(item => url.includes(item));
    const start = performance.now();
    return next.handle(request).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((event: HttpResponse<any>) => {
        if (isUseTiming) {
          console.log('time = ', performance.now() - start);
        }
        return event;
      })
    );
  }
}
