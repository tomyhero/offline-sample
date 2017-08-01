self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open('v1').then(function(cache) {
              return cache.addAll([ './style.css','./icon.png','https://ad-center-line-me.s3-ap-northeast-1.amazonaws.com/files/topics/943_ext_01_0.pdf?response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27mediaguide_LINE%2520Audience%2520Match_2017_7-9.pdf&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAI2J4E36RBCZRMWIA&Expires=1501579672&Signature=SNTtDAMPOHToydL25QS8KC6bIEs%3D&.pdf']);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        // return caches.match('/sw-test/gallery/myLittleVader.jpg');
      });
    }
  }));
});

