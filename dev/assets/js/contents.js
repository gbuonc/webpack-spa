require('script!t.js/t.min.js');
var app = require('../../config');

var contents = {
    init: function(){
        contents.render(0);
        $('.list-scroller').on('click', '.article-detail-link', function(e){
            var $el = $(this);
            var rel = $el.attr('data-rel');
            var cat =$el.attr('data-cat');
            var url = $el.attr('href');
            page('/issue/'+cat+'/'+rel+'/'+url);
            e.preventDefault();
            // contents.showArticle(cat, rel);
        })
    },
    render: function(i){
        var placeholder = document.getElementById('list-scroller');
        var template = new t(app.ui.articleDetailTemplate);
        app.ui.tabs[i].cat_id = i;
        var fragment = template.render(app.ui.tabs[i]);
        placeholder.innerHTML=fragment;
    },
    showArticle: function(ctx, next){
        console.log(ctx);
        app.ui.articleDetail.innerHTML='';
        // find current cat index in categories array
        var cat = app.ui.tabs.map(function(x) {return x.id; }).indexOf(ctx.params.ctg);
        setTimeout(function(){
            var template = new t(document.getElementById('article-template').innerHTML);
            var fragment = template.render(app.ui.tabs[cat]);
            app.ui.articleDetail.innerHTML=fragment;
            // init carousels
            var articlesNav = new Swiper('.article-navigation', {
                slidesPerView: 1,
                initialSlide: ctx.params.article
            });
            // articlesNav.on('onReachEnd', function(swiper){
            //     contents.showArticle(cat+1, 1);
            // });
        },0);
        app.ui.articleList.style.display ='none';
    }
};
module.exports = contents;
