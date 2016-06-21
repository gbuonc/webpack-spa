var app = require('../../config');
var utils = require('./utils.js');
var offline = {
    init: function(){
        // set offline strategy: service worker with appcache fallback
        var hasSWSupport = 'serviceWorker' in navigator;
        if (hasSWSupport && app.offline.serviceWorker){
            require('./sw-init.js'); // init service worker
            utils.log('offline support via service worker');
        }
        if(!hasSWSupport && app.offline.appCache){
            require('script!appcache-nanny/appcache-nanny.js');
            appCacheNanny.start();
            utils.log('offline support via appcache');
        }
    },
    showBadge : function(){
        $('.debug-connection').show();
    },
    hideBadge : function(){
        $('.debug-connection').hide();
    },
    showErrorPage : function(){
        var offLineMsg = 'Contenuti non disponibili.<br>Verifica la tua connessione di rete e riprova.';
        var offlineBtn = '<button class="btn btn-offline-reload">Ricarica</button>';
        $('body').append('<div class="offline-alert">'+offLineMsg+offlineBtn+'</div>');
        $('.btn-offline-reload').on('click', function(){
            location.reload();
        });
    }
};
module.exports = offline;
