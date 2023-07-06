const cacheName = new Date().toISOString();
const cacheLife = 20*1000; // 1 second
let canDelete = {};

self.addEventListener("install", (event) => {
    // self.skipWaiting();  
    // console.log("Service Worker installed");
});

// add activation event listener
self.addEventListener("activate", (event) => {
    // console.log("Service Worker activated");
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cache) => {
            const oldDate = new Date(cache);
            const newDate = new Date(cacheName);
            if (newDate.getTime() - oldDate.getTime() > cacheLife) {
                // console.log("Service Worker: Clearing Old Cache");
                canDelete[cache] = true;
                return caches.delete(cache);
            }
            else {
                // console.log("No old caches found!")
                // console.log(cache, "...", cacheName, newDate, oldDate, newDate.getTime() - oldDate.getTime())
            }
            })
        );
        }
        )
    );
    }
);

// add fetch event listener
self.addEventListener("fetch", (event) => {
    // console.log("Service Worker: Fetching");
    event.respondWith(
        // look for a match inside all caches
        caches.match(event.request)
        // if there is a cached version of the request serve that otherwise go to the network
        .then(res => res || 
            fetch(event.request)
            .then((res) => {
                // make clone of response
                const resClone = res.clone();
                // open cache
                caches.open(cacheName).then((cache) => {
                // add response to cache
                cache.put(event.request, resClone);
                });
                return res;
            })
            .catch((err) => caches.match(event.request).then((res) => res))
        )
        // fetch(event.request).then((res) => res).catch((err) => console.log(err))
    );
});