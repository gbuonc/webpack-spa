require('script!t.js/t.min.js');
var app = require('../../config');
var contents = {
    init: function(){
        $('.list-scroller').on('click', '.article-detail-link', function(e){
            // set internal navigation flag
            app.ui.internalNavigation = true;
            var $el = $(this);
            var rel = $el.attr('data-rel');
            var cat =$el.attr('data-cat');
            var url = $el.attr('href');
            page('/issue/'+cat+'/'+rel+'/'+url);
            e.preventDefault();
        })
    }
};
module.exports = contents;
