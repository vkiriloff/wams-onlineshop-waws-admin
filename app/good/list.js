define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://webinar-onlineshop.azure-mobile.net/';
    var appKey = 'ZHNxhVbjQhZTzUcMuXVQpugLVCIEEv25';

    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey);

    var model = {
        items: ko.observableArray([]),
        categories: ko.observableArray([]),
        category: ko.observable(''),

        activate: function() {
            var tableCategory = client.getTable('category');

            tableCategory.read().done(
                function (results) {
                    model.categories(results);
                },
                function (error) {
                    alert(error);
                }
            );
        },
        refresh: function() {
            if (model.category() == undefined) {
                model.items([]);
                return;
            }

            var tableGood = client.getTable('good');

            tableGood.where({ categoryId: model.category().id }).read().done(
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