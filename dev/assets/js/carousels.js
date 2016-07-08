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
    },
    showGalleryBtn: function(){
        $('.show-gallery').attr('style', '');
    }
};
module.exports = carousels;
