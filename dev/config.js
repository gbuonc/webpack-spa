var app = {
    title : 'Il Fatto Quotidiano - Web App',
    contentEndPoint : 'https://wp40.ilfattoquotidiano.it/premium/edizione/mercoledi-22-giugno-2016/?json=1',
    offline: {
        serviceWorker : false,
        appCache: false
    },
    status:{
        internalNavigation : false
    },
    ui:{
        tabs:[]
    },
    debug: true
};
module.exports = app;
