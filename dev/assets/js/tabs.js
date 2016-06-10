require('script!t.js/t.min.js');
var app = require('../../config');
var contents = require('./contents.js');
var tabs = {
    init: function(){
        var placeholder = document.getElementById('main-tabs');
        var template = new t(app.ui.articleListTemplate);
        var fragment = template.render(app.ui);
        placeholder.innerHTML=fragment;
        setTimeout(function(){
            // init carousels
            tabs.navTabs = new Swiper('.tab-navigation', {
                slidesPerView: 'auto',
                freemode: true,
                freeModeSticky: true,
                onInit: function(){
                    $('.tab-navigation').find('.swiper-slide').eq(0).addClass('active');
                }
            });
            tabs.navTabs.on('onTap', function(swiper, event){
                // routing
                var rel = event.target.attributes['data-rel'].value;
                page('/issue/'+rel);
            });
        },0);
    },
    gotoTab: function(ctx){
        // find current cat index in categories array
        var elementPos = app.ui.tabs.map(function(x) {return x.id; }).indexOf(ctx.params.ctg);
        // set active item
        $('.tab-navigation').find('.swiper-slide').removeClass('active')
        .eq(elementPos).addClass('active');
        contents.render(elementPos);
        // show list
        app.ui.articleList.style.display ='';
    }
};
module.exports = tabs;
