'use strict';

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
var offline = require('./assets/js/offline.js');
var shell = require('./assets/js/shell.js');
var routing = require('./assets/js/routing.js');
var adv = require('./assets/js/adv.js');
var latestIssue;

// ...
// --------------------------------------------------------------------
FastClick.attach(document.body);
offline.init();

// offline alerts ...................
Offline.options.checkOnLoad = true;
Offline.on('confirmed-down', function(){offline.showBadge();});
Offline.on('confirmed-up', function(){ offline.hideBadge();});

// routing .........................
app.landingUrl = window.location.hash ? window.location.hash.split('#/')[1] : ''; // check landing url from address bar
page.base('#');
page('/:issue/:ctg/', routing.getRoute);
page('/:issue/:ctg/:article', routing.getRoute);
page();

// request json
var offlineReq = localforage.getItem('latest');
//get latest online content (wrap in promise)
var onlineReq = $.ajax({
        dataType: "json",
        url: app.contentEndPoint
    });
onlineReq.then(function(resp){
    // remote call ok, save to localstorage and start app
    localforage.setItem('latest', resp);
    bootstrap(resp);
    utils.log('working with remote json');
}, function(err){
    // something went wrong, fallback to localstorage
    offlineReq.then( function(resp){
        bootstrap(resp);
        utils.log('error retrieving data online, working with local json');
    }).catch(function(err){
        offline.showErrorPage();
        utils.log('no local/remote data available');
    });
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
