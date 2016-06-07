require('script!swiper/dist/js/swiper.min.js');
require('script!fastclick/lib/fastclick.js');
var app = require('../../config');
var utils = require('./utils.js');
var tabs = require('./tabs.js');
var contents = require('./contents.js');
var latestIssue;

FastClick.attach(document.body);

//get latest local content (promise)
var offlineReq = localforage.getItem('latest');
//get latest online content (wrap in promise)
var onlineReq = Promise.resolve(
    $.ajax({
        dataType: "json",
        url: app.contentEndPoint
    })
);

// assume we are offline, so as soon as local storage returns, generate html
// offlineReq.then(function(resp){
//     if(resp){
//         console.log('bootstrap offline');
//         bootstrap(resp);
//     }
// });
// wait for both responses
Promise.all([offlineReq, onlineReq]).then(function(resp){
    // promise returns an array with resulting values in the same order as the input
    // set online object if available, otherwise fallback to storage
    latestIssue = resp[1] ? resp[1] : resp[0];
    if(latestIssue){
        bootstrap(latestIssue);
    }else{
        // if both are null, we have nothing to show, so throw a warning
        alert('Verifica la tua connessione');
    }
});

function bootstrap(issue){
    transformTabs(issue);
    transformContents(issue);
    tabs.init();
    contents.init();
    localforage.setItem('latest', issue);
}
function transformTabs(issue){
    var sections=Object.keys(issue);
    // create a tab object to use in templates
    // hopefully json will be already formatted server side
    // and we can skip this passage
    var l=sections.length;
    // empty tabs array so it does not append to existing tabs but starts again
    app.ui.tabs = [];
    for (var i= 0; i<l; i++) {
        var tmpObj = {};
        tmpObj.label = sections[i];
        // generate tab id by removing spaces
        tmpObj.id = tmpObj.label.split(' ').join('_');
        app.ui.tabs.push(tmpObj);
    }
}
function transformContents(issue){
    var sections=Object.keys(issue);
    var l=sections.length;
    for (var i= 0; i<l; i++) {
        app.ui.tabs[i].contents=issue[sections[i]];
    }
}
