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
            var navTabs = new Swiper('.tab-navigation', {
                slidesPerView: 'auto',
                freemode: true,
                freeModeSticky: true,
                onInit: function(){
                    $('.tab-navigation').find('.swiper-slide').eq(0).addClass('active');
                }
            });
            navTabs.on('onTap', function(swiper, event){
                // set active item
                $('.tab-navigation').find('.swiper-slide').removeClass('active')
                .eq(swiper.clickedIndex).addClass('active');
                contents.render(swiper.clickedIndex);
                // show list
                app.ui.articleList.style.display ='';
            });
        },0);
    }
};
module.exports = tabs;
