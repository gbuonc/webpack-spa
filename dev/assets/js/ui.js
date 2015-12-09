var app = require('../../config');
require('script!swiper/dist/js/swiper.min.js');  
require('script!ractive/ractive.min.js'); 
require('script!velocity/velocity.min.js');
require('script!fastclick/lib/fastclick.js');

var ui = {
    init: function(){
        FastClick.attach(document.body);
        var activeTab = 0;
        var $tabPos = $('.currentBar');
        var $navTabs = $('.tab-toggle');
        setTimeout(function(){
            var navTabs = new Swiper('.tab-navigation', {
                slidesPerView: 'auto',
                touchRatio: 1.5
            });
            var mainTabs = new Swiper ('.tabs-scroller',{
                threshold:50
            });

            // init tabs
            var currentSlide = navTabs.slides[activeTab];
            var w = currentSlide.clientWidth;
            var tabColor = $(currentSlide).attr('rel');
            $tabPos.css('width',w+'px').hide();
            $(currentSlide).addClass('active').css('borderColor', tabColor);


            navTabs.on('onTap', function(swiper, event){
                mainTabs.slideTo(swiper.clickedIndex);
                animateTabs(swiper.clickedIndex);
            });
            
            mainTabs.on('onTransitionStart', function(swiper){
                animateTabs(swiper.snapIndex);
            });
            mainTabs.on('onTransitionEnd', function(swiper){
                navTabs.slideTo(swiper.activeIndex);
                // animateTabs(swiper.activeIndex);
            });
            var animateTabs = function(index){
                var currentSlide = navTabs.slides[index];
                var tabColor = $(currentSlide).attr('rel');
                var offset = navTabs.translate;
                var w = currentSlide.clientWidth;
                var position = currentSlide.offsetLeft;
                // animate active tabs placeholder
                $navTabs.removeClass('active').css('borderColor','transparent');
                $tabPos.show().velocity({
                    translateZ: 0, // Force HA by animating a 3D property
                    translateX: position+offset+'px',
                    width: w,
                    backgroundColor: tabColor
                }, {
                    duration: 300,
                    complete: function(){
                        $(currentSlide).addClass('active').css('borderColor', tabColor);
                        $tabPos.hide();
                        // ractive.set({activeTab : index});
                    }
                });
            };
        },0);
    }
};
module.exports = ui;