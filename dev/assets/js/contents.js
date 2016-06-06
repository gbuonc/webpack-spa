var app = require('../../config');
require('script!ractive/ractive.min.js');

var contents = {
    init: function(){

        var ractive = new Ractive({
            el: '#tabs-scroller',
            template: require('../../templates/contents.tpl'),
            data: app.ui
        });
        ractive.on('showArticle', function(e){
            var ractive = new Ractive({
                el: '#article-detail',
                template: require('../../templates/article.tpl'),
                data: e.context
            });
            // scroll top article and hide article list
            app.ui.articleContent= document.querySelector('.article-content');
            app.ui.articleContent.offsetParent.scrollTop=0;
            app.ui.articleList.style.display ='none';
            console.log(e.context);
        })
    }
};
module.exports = contents;
