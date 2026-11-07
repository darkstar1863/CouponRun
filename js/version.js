// Single source of truth for the app version.
//
// Both the page (js/app.js, an ES module) and the service worker
// (sw.js, a classic script) read this file, so there is only ONE
// number to bump on every release — no second APP_VERSION to keep
// in sync. The home page shows "App version: v<N>" where N is this
// number; the service worker cache is named "couponrun-shell-v<N>".
//
// This file must stay a plain classic script (no import/export):
// sw.js loads it with importScripts(), and app.js loads it with a
// plain import. Both just run it and read the globals it sets.
//
// Bump APP_VERSION on every app-code change (same rule as before:
// a data-only main-list change does not need a bump).
self.APP_VERSION = '9';
self.SHELL_NAME = 'couponrun-shell-v' + self.APP_VERSION;
