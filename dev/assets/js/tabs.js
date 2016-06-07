require('script!t.js/t.min.js');
var app = require('../../config');
var contents = require('./contents.js');
var tabs = {
    init: function(){
        var placeholder = document.getElementById('main-tabs');
        var template = new t(document.getElementById('tabs-template').innerHTML);
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
                $('.tab-navigation').find('.swiper-slide').removeClass('active')
                .eq(swiper.clickedIndex).addClass('active');
                // show article list
                contents.render(swiper.clickedIndex);
                app.ui.articleList.style.display ='';
                app.ui.articleContent.style.display ='none';
            });
        },0);
    }
};
module.exports = tabs;
