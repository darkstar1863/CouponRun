// Main-list acquisition: ONE fetch path (used by silent start fetch and
// by the explicit Fetch button). A failed fetch never erases the previous
// list or personal data; a stale list stays usable.
const CACHE = 'couponrun-master-v1';
const URL = 'data/master-list.json';
export async function fetchMaster() {
  const res = await fetch(URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Fetch failed: HTTP ' + res.status);
  const text = await res.text();
  const data = JSON.parse(text);
  try {
    const cache = await caches.open(CACHE);
    await cache.put(URL, new Response(text, { headers: { 'Content-Type': 'application/json' } }));
  } catch { /* Cache Storage unavailable; in-memory list still works */ }
  return { data, text };
}
export async function readCachedMaster() {
  try {
    const cache = await caches.open(CACHE);
    const res = await cache.match(URL);
    if (res) return JSON.parse(await res.text());
  } catch {}
  return null;
}
export function isInstalled() {
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
    || window.navigator.standalone === true;
}
export const INSTALL_TEXT = 'Some features need this web page to be installed as an app. Please follow the directions below if you would like to create custom runs or personal coupons.\niPhone: tap Share, then Add to Home Screen.\nAndroid: tap Install, or Add to Home Screen, as offered by your browser.\nThen open the installed app.';
