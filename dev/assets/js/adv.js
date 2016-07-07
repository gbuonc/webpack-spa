var utils = require('./utils.js');
var adv = {
    init: function(){
        var gadx = document.createElement('script');
        gadx.async = true;
        gadx.type = 'text/javascript';
        var useSSL = 'https:' == document.location.protocol;
        gadx.src = (useSSL ? 'https:' : 'http:') +
        '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gadx, node);
        utils.log('init google dfp');
    },
    setupDFPModules: function(){
        // clear existing adv slots
        $('.dfp-placeholder').html('');
        var modules = [
            {
                'target' : 'dfp-placeholder-top',
                'class' : 'adsbygoogle',
                'data-ad-client' : 'ca-pub-1213026922849045',
                'data-ad-width' : '320',
                'data-ad-height' : '50',
                'data-ad-slot' : '1542583735'
            },
            {
                'target' : 'dfp-placeholder-bottom',
                'class' : 'adsbygoogle',
                'data-ad-client' : 'ca-pub-1213026922849045',
                'data-ad-width' : '300',
                'data-ad-height' : '250',
                'data-ad-slot' : '9065875855'
            }
        ]
        for(var i = 0, l= modules.length; i<l; i++){
            adv.injectDFP(modules[i]);
        }
    },
    injectDFP : function(module){
        $('<ins />').attr(module).appendTo('.swipeview-active .'+module.target);
        setTimeout(function(){
            adv.initDFP();
        }, 350);
    },
    initDFP: function(){
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}
module.exports = adv;
