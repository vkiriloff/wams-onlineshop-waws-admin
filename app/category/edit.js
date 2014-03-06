define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://webinar-onlineshop.azure-mobile.net/';
    var appKey = 'ZHNxhVbjQhZTzUcMuXVQpugLVCIEEv25';

    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey);

    var table = client.getTable('category');

    var model = {
        id: null,
        title: ko.observable(''),

        activate: function(categoryId) {
            model.id = categoryId;

            table.lookup(categoryId).done(
                function(result) {
                    model.title(result.title);
                },
                function(error) {
                    alert(error);
                }
            );
        },
        edit: function() {
            var entity = {
                id: model.id,
                title: model.title()
            };

            table.update(entity).done(
                function(result) {
                    alert('updated');
                },
                function(error) {
                    alert(error);
                }
            );
        }
    };

    return model;
});