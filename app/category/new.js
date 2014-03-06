define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://webinar-onlineshop.azure-mobile.net/';
    var appKey = 'ZHNxhVbjQhZTzUcMuXVQpugLVCIEEv25';

    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey);

    var model = {
        title: ko.observable(''),

        create: function() {
            var table = client.getTable('category');

            var entity = {
                title: model.title()
            };

            table.insert(entity).done(
                function(result) {
                    alert('inserted');
                },
                function(error) {
                    alert(error);
                }
            );
        }
    };

    return model;
});