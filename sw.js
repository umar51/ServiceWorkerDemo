//service worker

const cacheName = "version1";
const cacheAsset = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js',
    
];

//installing service worker(adding caches)
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => cache.addAll(cacheAsset))
        
    ).then(() => self.skipWaiting);
    console.log('service worker installed');

})

//activation of service worker + deleting the old duplicate cache
self.addEventListener('activate', (e) => {
    console.log('service worker activated');

    e.waitUntil(
    caches.keys().then( //keys() returns the keys of object content as an array 
        cacheNames => {
            return Promise.all( //promise.all returns the an array of all the results of many promises inside it 
                cacheNames.map(cache => {
                    if (cache != cacheName){
                        caches.delete(cache);
                        console.log("service worker deleting caches")

                    }}
                    )
            )
        }
    )
    )
})


// for offline app loading ability

self.addEventListener('fetch', e => {
    console.log("service worker : fetching")
    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request))

    )
})