import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { AppPreset } from './theme.preset';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { pt_BR } from 'primelocale/js/pt_BR.js';
import { authInterceptorFn } from './interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import ptLocale from '@angular/common/locales/pt';

registerLocaleData(ptLocale);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: AppPreset,
        options: {
          darkModeSelector: false,
        },
      },
      translation: pt_BR,
    }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
