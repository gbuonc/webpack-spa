var app = require('../../config');
require('script!ractive/ractive.min.js'); 
// require('script!iscroll/build/iscroll.js'); let's see...

function writeContent(content, id){
    var ractive = new Ractive({
        el: '#tab_'+id,
        template: require('../../templates/test.tpl'),
        data: content
    });
}

$(app.ui.tabs).each(function(i){
    var tab = app.ui.tabs[i];
    var storageKey = 'content_'+tab.id;
    var latestTabContent = store.get(storageKey);

    var dummyContent = {
        post_kicker: 'Dummy Kicker',
        title: tab.label,
        author : {
            byline:'Nome Cognome'
        },
        post_chain: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis exercitationem, ducimus excepturi odit repellat qui sunt minima vitae enim quaerat at ipsum dolore dolorum, pariatur fuga! Cupiditate nesciunt architecto enim.',
        images: [{url:'http://placehold.it/300x150'}]
    };

    // first get content from localstorage
    if(latestTabContent){}
    // next try to get latest content from network
    if(tab.id === 'FQ'){
        $.getJSON('https://st40.ilfattoquotidiano.it/wp-content/uploads/app.json', function(data){
            store.set(storageKey, data);
            writeContent(data['Primo Piano'][0], tab.id);
        });
    }else{
        store.set(storageKey, dummyContent);
        writeContent(dummyContent, tab.id);
    }
});


