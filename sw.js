"use strict";var precacheConfig=[["/steady/assets/android-chrome-144x144.png","6f24d48b38484812ff153aa33dbd1b22"],["/steady/assets/android-chrome-192x192.png","368f9f05be4ceb7463ffa6bf5f259e75"],["/steady/assets/android-chrome-256x256.png","f218e6cf6278ee5a8838af8582668a89"],["/steady/assets/android-chrome-36x36.png","fd9c5b47ca4308e85a0fbee09ec1aaad"],["/steady/assets/android-chrome-384x384.png","afc07bcadd82b2f946449e93edad8782"],["/steady/assets/android-chrome-48x48.png","bbd5c6caa2457d0b338bcb357c3e6e0b"],["/steady/assets/android-chrome-512x512.png","9c7ae744417e36d469799860935bbe7a"],["/steady/assets/android-chrome-72x72.png","840d5dd87510ca2a219ff403b5561d97"],["/steady/assets/android-chrome-96x96.png","f27e27270d85d03477b924fc2717a892"],["/steady/assets/apple-touch-icon-1024x1024.png","54ea7d24e2db757fad5fec3f55eba2e3"],["/steady/assets/apple-touch-icon-114x114.png","1e4e74736a1a9b8b2eb136416c9d0def"],["/steady/assets/apple-touch-icon-120x120.png","6fb0af605b2881fb7a333a32fbfceee5"],["/steady/assets/apple-touch-icon-144x144.png","431ac3199965b4bf5d68b449a2049cfc"],["/steady/assets/apple-touch-icon-152x152.png","0f073721ae0d5023ef3c70d1c71746cc"],["/steady/assets/apple-touch-icon-167x167.png","cb6e1ea11c1a9f99165a41ce7c7e70fe"],["/steady/assets/apple-touch-icon-180x180.png","03a5a354f5c164170db8a92db6449a29"],["/steady/assets/apple-touch-icon-57x57.png","dab8a9f7f2f1577b91e0aad91a023f03"],["/steady/assets/apple-touch-icon-60x60.png","c848b9171758cc27040283a149cd3864"],["/steady/assets/apple-touch-icon-72x72.png","235ad4c849b126b99035cb55f035cb6d"],["/steady/assets/apple-touch-icon-76x76.png","6f137ec17d00d8dff14a7ebfe0f5289c"],["/steady/assets/apple-touch-icon-precomposed.png","03a5a354f5c164170db8a92db6449a29"],["/steady/assets/apple-touch-icon.png","03a5a354f5c164170db8a92db6449a29"],["/steady/assets/apple-touch-startup-image-1182x2208.png","35a4a49d801acb417b99e3a41c1a55dc"],["/steady/assets/apple-touch-startup-image-1242x2148.png","d29bf654a44055156cda2c5275d441a6"],["/steady/assets/apple-touch-startup-image-1496x2048.png","6b1fed079aa97d15eb05f763b288ceca"],["/steady/assets/apple-touch-startup-image-1536x2008.png","3471cd565397ae9d717167242011036a"],["/steady/assets/apple-touch-startup-image-320x460.png","e4e195dd7618117e7d43ab0906eb3d7f"],["/steady/assets/apple-touch-startup-image-640x1096.png","96c90400758cf217d4570a25eb310a92"],["/steady/assets/apple-touch-startup-image-640x920.png","86dc053163521406a94f2302eb9cfc2f"],["/steady/assets/apple-touch-startup-image-748x1024.png","c365972948ee36d2f6fa18ebba258ee9"],["/steady/assets/apple-touch-startup-image-750x1294.png","8e6eefbd35ea26a14193ee7fc2861d54"],["/steady/assets/apple-touch-startup-image-768x1004.png","b618ffbc7c94937f99f12aabbd2243fc"],["/steady/assets/favicon-16x16.png","b3ad4f2fdfbb36bcf9a12ff7434d8250"],["/steady/assets/favicon-32x32.png","d2a7ecf32be1032ff0d76afe18d6469f"],["/steady/assets/favicon.ico","4c384e2767d9b26c7f7fa4bfdc4877b1"],["/steady/assets/manifest.json","ccd0734e43cf77b6e7b3e2280a221ec8"],["/steady/index.css","2d98e216e1445ad2b9a3c55fb5634659"],["/steady/index.html","fccd83357d81f70f587d0dfcd008f07b"],["/steady/index.js","776bf04ebf10afbaa13547ba359a8eaa"],["/steady/vendors.js","2e31aade1465bf6682c4279c02875417"]],cacheName="sw-precache-v3-steady-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],s=new URL(a,self.location),n=createCacheKey(s,hashParamName,t,!1);return[s.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var s=new Request(t,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});