require('script!t.js/t.min.js');
var app = require('../../config');

var contents = {
    init: function(){
        contents.render(0);
        $('.list-scroller').on('click', '.article-detail-link', function(e){
            console.log(e);
            var $el = $(this);
            var rel = $el.attr('data-rel');
            var cat = $el.attr('data-cat');
            e.preventDefault();
            contents.showArticle(cat, rel);
        })
    },
    render: function(i){
        var placeholder = document.getElementById('list-scroller');
        var template = new t(document.getElementById('list-template').innerHTML);
        app.ui.tabs[i].cat_id = i;
        var fragment = template.render(app.ui.tabs[i]);
        placeholder.innerHTML=fragment;
    },
    showArticle: function(cat, rel){
        var placeholder = document.getElementById('article-detail');
        var template = new t(document.getElementById('article-template').innerHTML);
        var fragment = template.render(app.ui.tabs[cat].contents[rel]);
        placeholder.innerHTML=fragment;
        app.ui.articleContent= document.querySelector('.article-content');
        app.ui.articleContent.offsetParent.scrollTop=0;
        app.ui.articleList.style.display ='none';
        app.ui.articleContent.style.display ='';
    }
};
module.exports = contents;
