var app = require('../../config');
require('script!ractive/ractive.min.js'); 

var content = {
    init: function(){
        console.log('init'); 
        var ractive = new Ractive({
            el: '#tabs-scroller',
            template: require('../../templates/contents.tpl'),
            data: app.ui
        });
    },
    initContents : function(){
        
        // var mainTabs = new Swiper ('.tabs-scroller',{
        //     threshold:50
        // });
        // mainTabs.on('onTransitionStart', function(swiper){
        //     animateTabs(swiper.snapIndex);
        // });
        // mainTabs.on('onTransitionEnd', function(swiper){
        //     navTabs.slideTo(swiper.activeIndex);
        //     // animateTabs(swiper.activeIndex);
        // });
    }
};
module.exports = content;



// require('script!iscroll/build/iscroll.js'); let's see...

// function writeContent(content, id){
//     var ractive = new Ractive({
//         el: '#tab_'+id,
//         template: require('../../templates/test.tpl'),
//         data: content
//     });
// }

// $(app.ui.tabs).each(function(i){
//     var tab = app.ui.tabs[i];
//     var storageKey = 'content_'+tab.id;
//     var latestTabContent;
//     localforage.getItem(storageKey).then(function(value) {
//         latestTabContent = value;
//         console.log(value);
//     });

//     var dummyContent = {
//         post_kicker: 'Dummy Kicker',
//         title: tab.label,
//         author : {
//             byline:'Nome Cognome'
//         },
//         post_chain: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim.',
//         images: [{url:'http://placehold.it/300x150'}]
//     };

//     // first get content from localstorage
//     if(latestTabContent){
//         writeContent(latestTabContent['Primo Piano'][0], tab.id);

//     }
//     // next try to get latest content from network
//     if(tab.id === 'FQ'){
//         $.getJSON('https://st40.ilfattoquotidiano.it/wp-content/uploads/app.json', function(data){
//             localforage.setItem(storageKey, data, function(err, value) {
//                 writeContent(value['Primo Piano'][0], tab.id);
//                 $('.splash').hide();
//                 console.log(value);
//             });
//         });
//     }else{
//         localforage.setItem(storageKey, dummyContent, function(err, value) {
//             writeContent(value, tab.id);
//             console.log(value);
//         });
//     }
// });


