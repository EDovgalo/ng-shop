import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {TimingInterceptor} from './timing/timing.interceptor';

export const httpInterceptorFactory = (filters) => ({
  provide: HTTP_INTERCEPTORS,
  useFactory: () => new TimingInterceptor(filters),
  multi: true
});
