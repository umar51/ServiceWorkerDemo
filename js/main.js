
//checking service worker support and registering service worker file

if ('serviceWorker' in navigator){
    //console.log('service worker supproted')
    window.addEventListener("load", () => {
        navigator.serviceWorker
        .register('../sw2.js')
        .then(reg=> console.log(`service worker registered  `))
        .catch(err => console.log(`serive worker: ${err}`));
        
    })
}