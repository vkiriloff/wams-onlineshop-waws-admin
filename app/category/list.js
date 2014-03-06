define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://webinar-onlineshop.azure-mobile.net/';
    var appKey = 'ZHNxhVbjQhZTzUcMuXVQpugLVCIEEv25';

    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey);

    var model = {
        items: ko.observableArray([]),

        activate: function() {
            var table = client.getTable('category');

            table.read().done(
                function (results) {
                    model.items(results);
                },
                function (error) {
                    alert(error);
                }
            );
        }
    };

    return model;
});