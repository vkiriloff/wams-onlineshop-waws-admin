define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://webinar-onlineshop.azure-mobile.net/';
    var appKey = 'ZHNxhVbjQhZTzUcMuXVQpugLVCIEEv25';

    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey);

    var model = {
        categories: ko.observableArray([]),

        categoryId: ko.observable(''),
        title: ko.observable(''),

        activate: function() {
            var table = client.getTable('category');

            table.read().done(
                function(results) {
                    model.categories(results);
                },
                function(error){
                    alert(error);
                });
        },
        create: function() {
            var entity = {
                title: model.title(),
                categoryId: model.categoryId().id
            };

            var table = client.getTable('good');

            table.insert(entity).done(
                function(result){
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