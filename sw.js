"use strict";var precacheConfig=[["/steady/assets/android-chrome-144x144.png","9765a428386dd29d634330da6dfdefe1"],["/steady/assets/android-chrome-192x192.png","f0f21c10189147bb73070e177f175451"],["/steady/assets/android-chrome-256x256.png","c969f6f95aaa24a46bc075d84a292e45"],["/steady/assets/android-chrome-36x36.png","887e4f1e319e23535ba6d8e2ec6ca546"],["/steady/assets/android-chrome-384x384.png","817d303b92bb51d664ffaebc35eae901"],["/steady/assets/android-chrome-48x48.png","55542f8757f7c4ca5d2d0f8c19a8e5bf"],["/steady/assets/android-chrome-512x512.png","accb96e90b84e629a27c7c9e5fa2a57a"],["/steady/assets/android-chrome-72x72.png","17da63fae6f94bc955b8d122f570ab51"],["/steady/assets/android-chrome-96x96.png","11633edbad7574a55de96b03dd997349"],["/steady/assets/apple-touch-icon-1024x1024.png","25e1f3559ffddff868d905aef8716f10"],["/steady/assets/apple-touch-icon-114x114.png","f831e0e188096bb33b3dd9a69e2fbae1"],["/steady/assets/apple-touch-icon-120x120.png","1a3a710668c6ca86aa86c245c59a2376"],["/steady/assets/apple-touch-icon-144x144.png","c6aa0e1b2b0c903f2fc05b0507875d48"],["/steady/assets/apple-touch-icon-152x152.png","7f3cbd9e0de8872e89535e8bc004c697"],["/steady/assets/apple-touch-icon-167x167.png","6958cb0a9e8faf6da50c35ac5c8ee99f"],["/steady/assets/apple-touch-icon-180x180.png","d71cb36872e1b216859e6d4105de0324"],["/steady/assets/apple-touch-icon-57x57.png","3ad9305e6ed46f9ac46d40edf3e93f2d"],["/steady/assets/apple-touch-icon-60x60.png","cbef53d108d76a16d23d50cb1cf8b5e3"],["/steady/assets/apple-touch-icon-72x72.png","312d28409fd59296988354d06cd2b7c4"],["/steady/assets/apple-touch-icon-76x76.png","95e548c348dcc178d625d40e2a820997"],["/steady/assets/apple-touch-icon-precomposed.png","d71cb36872e1b216859e6d4105de0324"],["/steady/assets/apple-touch-icon.png","d71cb36872e1b216859e6d4105de0324"],["/steady/assets/apple-touch-startup-image-1125x2436.png","a8c3e6ac3114d2df2198ef2675d0bd72"],["/steady/assets/apple-touch-startup-image-1136x640.png","02724992c1b9b67e56b90b0d179aec62"],["/steady/assets/apple-touch-startup-image-1242x2208.png","b301e867e9c9103748befc0c96e5214d"],["/steady/assets/apple-touch-startup-image-1242x2688.png","3c65ce6e209be54c9a6fbc4c1182806f"],["/steady/assets/apple-touch-startup-image-1334x750.png","ac2a2c226dbdaa22b3b4fa77f19bfe5c"],["/steady/assets/apple-touch-startup-image-1536x2048.png","c2199a3bc30c997efc14ee422c5fa25d"],["/steady/assets/apple-touch-startup-image-1620x2160.png","296a0607dd60604f788424e2f7ef1f48"],["/steady/assets/apple-touch-startup-image-1668x2224.png","7e7014f589bfe7a878c50834ceceaa6c"],["/steady/assets/apple-touch-startup-image-1668x2388.png","27f301b32567d0e08a970eaee004b2a8"],["/steady/assets/apple-touch-startup-image-1792x828.png","6440d2ff1c46742e81f370062d91f349"],["/steady/assets/apple-touch-startup-image-2048x1536.png","13c8bd3e383c4171d7f4e5bcd82b311a"],["/steady/assets/apple-touch-startup-image-2048x2732.png","4fd9db8ffbed6322365b89291cf94607"],["/steady/assets/apple-touch-startup-image-2160x1620.png","0250275529d0dcb366b4d12c7b9cb0c0"],["/steady/assets/apple-touch-startup-image-2208x1242.png","5e8543405f5ac245205eba96e967482c"],["/steady/assets/apple-touch-startup-image-2224x1668.png","cdc5821baff759fb29ce4905a2c0524d"],["/steady/assets/apple-touch-startup-image-2388x1668.png","8da338c8ec333fe24226aa0598ba7a41"],["/steady/assets/apple-touch-startup-image-2436x1125.png","48a0018cf98ccd0a273a6f8113e8cbc0"],["/steady/assets/apple-touch-startup-image-2688x1242.png","0d45b6ab3f0b943bf8b0a2b09f6f65c4"],["/steady/assets/apple-touch-startup-image-2732x2048.png","7bbaa9f3c1ae25c70cf74638e30e4a0a"],["/steady/assets/apple-touch-startup-image-640x1136.png","74ccba0b4dbd23f7f096d8207e482245"],["/steady/assets/apple-touch-startup-image-750x1334.png","c1b9683ad39d937992b593dd47407dd5"],["/steady/assets/apple-touch-startup-image-828x1792.png","20e21128b22566bb30d3631418bbea23"],["/steady/assets/favicon-16x16.png","94e6dd8941fe1d06b0a7d39bb6eab708"],["/steady/assets/favicon-32x32.png","86c81b786aa3a08809a6f6b3ee331fe7"],["/steady/assets/favicon-48x48.png","55542f8757f7c4ca5d2d0f8c19a8e5bf"],["/steady/assets/favicon.ico","bb79bf067492783928537a922be937b7"],["/steady/assets/manifest.json","ccd0734e43cf77b6e7b3e2280a221ec8"],["/steady/index.css","2b22d6bdaecf713e6439c0bf86e519b0"],["/steady/index.html","8a25ff8c347968a0683ef4e03ceb500d"],["/steady/index.js","96dcc1ff09d2caeb108b9e13e518b033"],["/steady/vendors.js","0fd7eeb9b342f12b02f501fd1a060c64"]],cacheName="sw-precache-v3-steady-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,s){var c=new URL(e);return s&&c.pathname.match(s)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],s=new URL(a,self.location),c=createCacheKey(s,hashParamName,t,!1);return[s.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var s=new Request(t,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});