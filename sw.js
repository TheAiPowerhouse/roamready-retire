// Retire worker for roamready.life (Free Ranger moved to freeranger.app, 2026-11-08).
//
// Phones that saved the old roamready.life web app to their home screen run it
// from an offline copy kept by the old service worker at this same address
// (/sw.js). The browser checks /sw.js for updates whenever the app opens, finds
// this file, and installs it. This worker then deletes the old offline copy,
// unregisters itself, and sends every open window to the "moved" page, which
// tells the traveller to open freeranger.app and add it to their home screen.

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (e) {}
      await self.clients.claim();
      const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      await self.registration.unregister();
      await Promise.all(
        windows.map((client) => {
          try {
            return client.navigate("/?moved=1");
          } catch (e) {
            return null;
          }
        }),
      );
    })(),
  );
});

// Until the old copy is gone, answer every request from the network, never a cache.
self.addEventListener("fetch", () => {});
