import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      closeButton: true,
      tapToDismiss: false,
    }),
  ]
};
