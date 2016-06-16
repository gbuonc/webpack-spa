var app = require('../../config');
var utils = {
    showOfflineAlert : function(){
        $('.debug-connection').show();
    },
    hideOfflineAlert : function(){
        $('.debug-connection').hide();
    },
    transformTabs: function(issue){
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
            tmpObj.id = tmpObj.label.split(' ').join('_').toLowerCase();
            app.ui.tabs.push(tmpObj);
        }
    },
    transformContents: function(issue){
        var sections=Object.keys(issue);
        var l=sections.length;
        for (var i= 0; i<l; i++) {
            app.ui.tabs[i].contents=issue[sections[i]];
        }
    }
};
module.exports = utils;
