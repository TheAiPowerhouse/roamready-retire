# roamready-retire

roamready.life after the app moved to **Free Ranger** (freeranger.app), 2026-11-08.

Phones that saved the old roamready.life web app to their home screen keep running an offline copy that can't update through a redirect. This tiny site, served by GitHub Pages at roamready.life, retires those copies:

- `sw.js`: a retire service worker. The old copy's update check installs it; it deletes the old offline cache, unregisters itself, and shows the "moved" page.
- `version.json`: a newer build time, which also triggers the old app's own clean-reload path.
- `index.html` / `404.html`: in a normal browser, they forward to the same path on freeranger.app. Opened from an old home-screen icon, they show how to install Free Ranger.

Retire this repo and let roamready.life lapse (renewal April 2027) once traffic stops.
