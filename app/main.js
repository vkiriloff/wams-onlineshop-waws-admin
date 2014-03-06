requirejs.config({
    paths: {
        'text': '../js/require/text',
        'durandal':'../js/durandal',
        'plugins' : '../js/durandal/plugins',
        'transitions' : '../js/durandal/transitions',
        'knockout': '../js/knockout/knockout-2.3.0',
        'jquery': '../js/jquery/jquery-1.9.1.min',
        'wams': '../js/wams/MobileServices.Web-1.1.3.min'
    }
});

define(function (require) {
    var system = require('durandal/system');
    var app = require('durandal/app');

    system.debug(true);

    app.title = 'Wallet Buddy';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function() {
        app.setRoot('shell');
    });
});