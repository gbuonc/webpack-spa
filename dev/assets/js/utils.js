var utils = {
    showSplash : function(){

    },
    hideSplash : function(){
        setTimeout(function(){
            $('.splash').hide();
        }, 0);
    },
    showOfflineAlert : function(){
        $('.debug-connection').show();
    },
    hideOfflineAlert : function(){
        $('.debug-connection').hide();
    }
};
module.exports = utils;
