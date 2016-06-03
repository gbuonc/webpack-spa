'use strict';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function(reg) {
    // updatefound is fired if service-worker.js changes.
    reg.onupdatefound = function() {
      var installingWorker = reg.installing;

      installingWorker.onstatechange = function() {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
                alert('New content is available; please refresh.');
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // It's the perfect time to display a "New content is available; please refresh."
              // message in the page's interface.
              console.log('New or updated content is available.');
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a "Content is cached for offline use." message.
              alert('Content is now available offline!');
              console.log('Content is now available offline!');
            }
            break;
          case 'redundant':
            alert('The installing service worker became redundant.');
            console.error('The installing service worker became redundant.');
            break;
        }
      };
    };
  }).catch(function(e) {
    console.error('Error during service worker registration:', e);
  });
}

// -----------------------------------------------------------------------------------------------
require('script!zepto.js/dist/zepto.min.js');
require('script!zepto.js/src/callbacks.js');
require('script!zepto.js/src/deferred.js');
require('script!offline/offline.min.js');
require('script!localforage/dist/localforage.min.js');

console.log('----------------------\nFQ WebApp BUILD VERSION '+ Date.now()+'\n----------------------');
var app = require('./config');
var utils = require('./assets/js/utils.js');
Offline.options.checkOnLoad = true;
Offline.on('confirmed-down', function(){
    utils.showOfflineAlert();
});
Offline.on('confirmed-up', function(){
    utils.hideOfflineAlert();
});
require('./assets/js/bootstrap.js');
