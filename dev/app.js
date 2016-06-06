'use strict';
// init service worker
require('./assets/js/sw-init.js');
// -----------------------------------------------------------------------------------------------
require('script!zepto.js/dist/zepto.min.js');
require('script!zepto.js/src/callbacks.js');
require('script!zepto.js/src/deferred.js');
require('script!zepto.js/dist/zepto.min.js');
require('script!lazysizes/lazysizes.min.js');
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
