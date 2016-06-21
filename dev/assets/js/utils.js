var app = require('../../config');
var utils = {
    showOfflineBadge : function(){
        $('.debug-connection').show();
    },
    hideOfflineBadge : function(){
        $('.debug-connection').hide();
    },
    showOfflinePage : function(){
        var offLineMsg = 'Contenuti non disponibili.<br>Verifica la tua connessione di rete e riprova.';
        var offlineBtn = '<button class="btn btn-offline-reload">Ricarica</button>';
        $('body').append('<div class="offline-alert">'+offLineMsg+offlineBtn+'</div>');
        $('.btn-offline-reload').on('click', function(){
            location.reload();
        });
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
    },
    log: function(message){
        if(app.debug){
            console.debug('[IFQ >> '+message+']');
        }
    }
};
module.exports = utils;
