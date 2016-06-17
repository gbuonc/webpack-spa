'use strict';
// require('./assets/js/sw-init.js'); // init service worker
require('script!fastclick/lib/fastclick.js');
require('script!zepto.js/dist/zepto.min.js');
require('script!zepto.js/src/callbacks.js');
require('script!zepto.js/src/deferred.js');
require('script!lazysizes/lazysizes.min.js');
require('script!lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js');
require('script!offline/offline.min.js');
require('script!localforage/dist/localforage.min.js');
require('script!page/page.js');

var app = require('./config');
var utils = require('./assets/js/utils.js');
var shell = require('./assets/js/shell.js');
var routing = require('./assets/js/routing.js');
var adv = require('./assets/js/adv.js');
var latestIssue;
// --------------------------------------------------------------------
FastClick.attach(document.body);

// offline alerts ...................
Offline.options.checkOnLoad = true;
Offline.on('confirmed-down', function(){utils.showOfflineAlert();});
Offline.on('confirmed-up', function(){ utils.hideOfflineAlert();});

// routing .........................
app.landingUrl = window.location.hash ? window.location.hash.split('#/')[1] : ''; // check landing url from address bar
page.base('#');
page('/:issue/:ctg/', routing.getRoute);
page('/:issue/:ctg/:article', routing.getRoute);
page();

// request json ......................
var offlineReq = localforage.getItem('latest');
//get latest online content (wrap in promise)
var onlineReq = Promise.resolve(
    $.ajax({
        dataType: "json",
        url: app.contentEndPoint
    })
);
Promise.all([offlineReq]).then(function(resp){
    // promise returns an array with resulting values in the same order as the input
    // set online object if available, otherwise fallback to storage
    latestIssue = resp[1] ? resp[1] : resp[0];
    console.debug('>>> using json from '+ (resp[1] ? 'online' : 'local storage'));
    if(latestIssue){
        localforage.setItem('latest', latestIssue);
        bootstrap(latestIssue);
    }else{
        // if both are null, we have nothing to show, so throw a warning
        alert('Verifica la tua connessione');
    }
});

// initialize app .......................
function bootstrap(issue){
    // format json
    utils.transformTabs(issue);
    utils.transformContents(issue);
    // init UI
    shell.navbarTabs.init();
    shell.articleList.init();
    // bootstrap adv
    adv.init();
    // if a well-formed url with hashtag is present in navigation bar,
    // try to get corresponding article/category
    // otherwise load current first category path
    if(app.landingUrl){
        page('/'+app.landingUrl);
    }else{
        page('/issue/'+app.ui.tabs[0].id+'/');
    }
}
