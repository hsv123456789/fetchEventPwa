import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // Register the custom service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/custom-sw.js')
      .then((registration) => {
        console.log('Custom Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Custom Service Worker registration failed:', error);
      });
  });
}