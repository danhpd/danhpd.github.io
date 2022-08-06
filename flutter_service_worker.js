'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "2bcd2cabe440ad2f9c030dba35cc7523",
"assets/assets/avatar_logo.png": "a04a75e6055f76cb2e4c4880e8c2382d",
"assets/assets/images/bangcaosuxop.jpg": "080fe67eaaeff73cb5f893ca92689305",
"assets/assets/images/bongceramicdangroi.jpg": "fc228573797c4537460eb9565e676a91",
"assets/assets/images/bongcuon.jpg": "43fc95aed02a97cadfa6a55d015c1c3f",
"assets/assets/images/bongkhoangcuon.jpg": "56ef841950bee4a9a29f8990c9fcc6f2",
"assets/assets/images/bongkhoangtam.jpg": "db7e58aa3e8827d840852b44c5921068",
"assets/assets/images/bongthuytinhcuon.jpg": "9a888b9e810201412f124ad6ae2a0e6f",
"assets/assets/images/bongthuytinhtam.jpg": "290d3a15162cce80a8ba10403038f4f8",
"assets/assets/images/caosuxopcokaocobac.jpg": "48ff798100e70ae3726ad635b1199a05",
"assets/assets/images/caybongkhoang.jpg": "01fd1f6fe6bdb52b4194be6119ba33e9",
"assets/assets/images/caythuytinh.jpg": "15e59a73611a1b693319b62ab5b2d5a4",
"assets/assets/images/dayceramic.jpg": "ed11ff78a59f2144a68495c5697d3f33",
"assets/assets/images/logo.png": "d13f1ddd40e95bf96f0d54a815997bfc",
"assets/assets/images/maps.png": "3aa4457f07047b899fd58bcb83baa2be",
"assets/assets/images/one.jpg": "d74d1906b7e5a93005bc057eee541c06",
"assets/assets/images/ongcaosuxop.jpg": "4621adf00647d203ec9b52176a2ab0fe",
"assets/assets/images/ongkhoang.jpg": "aab1dfd22a7640b23c17a19cc4b69a0d",
"assets/assets/images/ongmembaoonbentrong.jpg": "9b1e1750cdc5de01bbf7fcae7ba4f410",
"assets/assets/images/ongmemcobaoon.jpg": "2cab0c266b7fb7b716ae8aefd64fed0b",
"assets/assets/images/ongmemkobaoon.jpg": "e1eb6a99a699c06c3c772c51a5a0e387",
"assets/assets/images/ongpvc.jpg": "ca54ba6d63e46a1fe039f897b8d98e1c",
"assets/assets/images/ongthuytinh.jpg": "f5c290b9cde2633cc61401784dd24e5b",
"assets/assets/images/tamcaosuxop.jpg": "3b34217b1a02519e3af5c39f5786d8fa",
"assets/assets/images/tamceramic.jpg": "f3e174099170b06933c17b8238fea34a",
"assets/assets/images/three.jpg": "b0b2fc58c53d4d858be0983e98ce669c",
"assets/assets/images/two.jpg": "90bab9e2bb97f6e7d6270336494c5b72",
"assets/assets/placeholder_image.jpeg": "7503e6cf2543d4ca2be30df8c8f9cdca",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "0ace2d361168dd51cce8d659c11c0c0a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "90c6d1d9a67b3bc7ddf37b355fec7749",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "dbc8c7347952fbf426ee373aab25039f",
"/": "dbc8c7347952fbf426ee373aab25039f",
"main.dart.js": "8ee1223ed4b6f9718bde02ffa14382a7",
"manifest.json": "2fb9188af0bb263135877d3e3a776209",
"version.json": "9094aacdae789dccd67fa32109ff1a18"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
