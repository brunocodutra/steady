"use strict";var precacheConfig=[["/steady/assets/android-chrome-144x144.png","1ba727dd3fe01efbe52a5cb4c0b7a846"],["/steady/assets/android-chrome-192x192.png","95f21d91d038e0c53eba65bd24f6784d"],["/steady/assets/android-chrome-256x256.png","b2764c40848954f65ab2df5f60674e74"],["/steady/assets/android-chrome-36x36.png","ab16b57e1acc7b470057a1fedf5064d4"],["/steady/assets/android-chrome-384x384.png","d30d7f4f712728fb9a43341ea660e352"],["/steady/assets/android-chrome-48x48.png","8a827cb24a9be2c2cb7e7e58f280dd76"],["/steady/assets/android-chrome-512x512.png","38ed8c9c1dafca56cca16f732841b82a"],["/steady/assets/android-chrome-72x72.png","56c6a0964b968ec7dda6b0580a34ba4b"],["/steady/assets/android-chrome-96x96.png","3a4bba05c636f7e36bbfe77308f3d1ad"],["/steady/assets/apple-touch-icon-114x114.png","86576da99e6e1c68d9d31052520548fb"],["/steady/assets/apple-touch-icon-120x120.png","21b87ffa615ab0688f9a2bad2c304d47"],["/steady/assets/apple-touch-icon-144x144.png","c48e9e4e139b20ce7679f0f0790d40c0"],["/steady/assets/apple-touch-icon-152x152.png","4569d78a8e555922df33a3fbd89c1321"],["/steady/assets/apple-touch-icon-167x167.png","1e1cd1910d934663671d272365595dd8"],["/steady/assets/apple-touch-icon-180x180.png","1e80f12655f32af6d7797abac76d20df"],["/steady/assets/apple-touch-icon-57x57.png","c4ca2be34d6968659fbb53c3f51505d9"],["/steady/assets/apple-touch-icon-60x60.png","8bd54d8d4ec7295aebd8569a1409b6e7"],["/steady/assets/apple-touch-icon-72x72.png","8110524e1f64f9d50b12957f39907b7e"],["/steady/assets/apple-touch-icon-76x76.png","f9b0ca68d3fed5060e3652f2040805cc"],["/steady/assets/apple-touch-icon-precomposed.png","1e80f12655f32af6d7797abac76d20df"],["/steady/assets/apple-touch-icon.png","1e80f12655f32af6d7797abac76d20df"],["/steady/assets/apple-touch-startup-image-1182x2208.png","2b55dc384c0235520aa5d942bd2b8df5"],["/steady/assets/apple-touch-startup-image-1242x2148.png","da2a8762e42ac7dc69a8ebfa44ea82a0"],["/steady/assets/apple-touch-startup-image-1496x2048.png","86a8cda4a9b0cc4b0475b3cb49ca9561"],["/steady/assets/apple-touch-startup-image-1536x2008.png","6bfab4de2c7aa64f6271ffda64c758ca"],["/steady/assets/apple-touch-startup-image-320x460.png","c94db600112c19711c38dc7db2525c57"],["/steady/assets/apple-touch-startup-image-640x1096.png","8ffb63816b5ae6179fa69ce6d39a5308"],["/steady/assets/apple-touch-startup-image-640x920.png","c7998d3e858553a6862adbcc8a1f8617"],["/steady/assets/apple-touch-startup-image-748x1024.png","0f45f610d3d2d9654d217085c1830d5a"],["/steady/assets/apple-touch-startup-image-750x1294.png","9535d92417b27f08a9475780fe5830ef"],["/steady/assets/apple-touch-startup-image-768x1004.png","f42e233bf5409762c9d36d7a73ef1b81"],["/steady/assets/favicon-16x16.png","b567ee46ceec6120e70469d86ed46668"],["/steady/assets/favicon-32x32.png","73573f2864161546ae60217b0a7148dc"],["/steady/assets/favicon.ico","4c384e2767d9b26c7f7fa4bfdc4877b1"],["/steady/assets/manifest.json","e5b4376c84a733a4f00a2231d9a8752c"],["/steady/index.css","f1a8c83aba857a2e3bb338de276fa6e4"],["/steady/index.html","7c124a5b9918616735b10d0194652870"],["/steady/index.js","caf39df959c1c752ebcf08b9a005eff4"],["/steady/vendors.js","bcf3aa23c2e27ccd5e2461f5c7ee35d7"]],cacheName="sw-precache-v3-steady-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],s=new URL(a,self.location),n=createCacheKey(s,hashParamName,t,!1);return[s.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var s=new Request(t,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});