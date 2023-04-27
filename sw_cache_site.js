const timeOfCacheNow = new Date().toISOString();
const url = "cache_policy_config.json";
var cachePolicy = null;

const fetchJson = async () => {
  try {
    const data = await fetch(url);
    const response = await data.json(); 
    cachePolicy = response; 
  } catch (error) {
    // console.log(error);
  }
 };

fetchJson();


self.addEventListener("install", (event) => {
  // console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  //console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          var maxAge = cachePolicy.default.lifespan; // default
          if (cache.includes(cachePolicy.images.name)) {
            maxAge = cachePolicy.images.lifespan;
          }
          const subCache = cache.substring(cache.indexOf(" ") + 1);
          const oldDate = new Date(subCache);
          const newDate = new Date(timeOfCacheNow);
        //   console.log("dates", oldDate, newDate);
          if (newDate.getTime() - oldDate.getTime() > maxAge * 1000) {
            caches.delete(cache);
            // console.log("deleting", cache.substring(0,cache.indexOf(' ')), "...", (newDate.getTime() - oldDate.getTime())/1000, "seconds have passed");
          }
        })
      );
    })
  );
});

// fetch event listener
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (response) =>
        response ||
        fetch(event.request)
          .then((response) => {
            const clonedResponse = response.clone();
            var cacheName = cachePolicy.default.name + " ";
            var maxAge = cachePolicy.default.lifespan; // default
            if (event.request.destination === cachePolicy.images.destination) {
              cacheName = cachePolicy.images.name + " ";
              maxAge = cachePolicy.default.lifespan; // 1 week
            }
            cacheName = cacheName + timeOfCacheNow;
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
            return response;
          })
          .catch((err) => caches.match(event.request).then((res) => res))
    )
  );
});
