//for caching whole website 

//service worker

const cacheName = "version2.0";


//installing service worker(adding caches)
self.addEventListener('install', (e) => {

   //caching will not be done in install event
    // e.waitUntil(
    //     caches
    //     .open(cacheName)
    //     .then(cache => cache.addAll(cacheAsset))
        
    // ).then(() => self.skipWaiting);
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
    // e.respondWith(
    //     fetch(e.request).catch(()=> caches.match(e.request))

    // )

    //installing cahces and enabling offline loading ability here in fetch event

    e.respondWith(
        fetch(e.request)
        .then(
            res => {
            const resClone = res.clone();
            caches
            .open(cacheName)
            .then(
                cache => cache.put(e.request, resClone)
            )
            return res;
            }).catch(err => caches.match(e.request).then(res=> res))
       
    )
})