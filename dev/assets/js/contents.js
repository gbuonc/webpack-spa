require('script!t.js/t.min.js');
var app = require('../../config');

var contents = {
    init: function(){
        contents.render(0);
        $('.list-scroller').on('click', '.article-detail-link', function(e){
            var $el = $(this);
            var rel = parseInt($el.attr('data-rel'), 10);
            var cat = parseInt($el.attr('data-cat'), 10);
            e.preventDefault();
            contents.showArticle(cat, rel);
        })
    },
    render: function(i){
        var placeholder = document.getElementById('list-scroller');
        var template = new t(app.ui.articleDetailTemplate);
        app.ui.tabs[i].cat_id = i;
        var fragment = template.render(app.ui.tabs[i]);
        placeholder.innerHTML=fragment;
    },
    showArticle: function(cat, rel){
        setTimeout(function(){
            var template = new t(document.getElementById('article-template').innerHTML);
            var fragment = template.render(app.ui.tabs[cat]);
            app.ui.articleDetail.innerHTML=fragment;
            // init carousels
            var articlesNav = new Swiper('.article-navigation', {
                slidesPerView: 1,
                initialSlide: rel
            });
            // articlesNav.on('onReachEnd', function(swiper){
            //     contents.showArticle(cat+1, 1);
            // });
        },0);
        app.ui.articleList.style.display ='none';
    }
};
module.exports = contents;
