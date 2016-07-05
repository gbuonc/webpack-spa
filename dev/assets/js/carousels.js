var app = require('../../config');
var utils = require('./utils.js');
var carousels = {
    init: function(){
        var showGalleryBtn = $('.show-gallery');
        showGalleryBtn.on('click', function(){
            $(this).hide();
        });
        var articlesCarousel = new Swiper('.swipeview-active .article-gallery', {
            slidesPerView: 1
        });
        // SWIPER.JS version
        // var articlesCarousel = new Swiper('.article-gallery', {
        //     slidesPerView: 1,
        //     onSlideChangeEnd: function(){
        //         // show gallery btn
        //         showGalleryBtn.attr('style', '');
        //     }
        // });
    },
    showGalleryBtn: function(){
        $('.show-gallery').attr('style', '');
    }
};
module.exports = carousels;
