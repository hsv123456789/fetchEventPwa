// src/custom-sw.js

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
  });
  
  // Activate event
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
  });
  
  // Fetch event
  self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Return the response from the network
          return response;
        })
        .catch((error) => {
          console.error('Fetch failed; returning offline page instead.', error);
          // Here you can return a fallback page if offline, or handle errors
          return new Response('You are offline');
        })
    );
  });
  