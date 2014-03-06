define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://webinar-onlineshop.azure-mobile.net/';
    var appKey = 'ZHNxhVbjQhZTzUcMuXVQpugLVCIEEv25';

    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey);

    var model = {
        message: ko.observable(''),

        activate: function() {
            client.invokeApi('ping', {
                body: null,
                method: "get"
            }).done(
                function(data) {
                    model.message(data.result.message);
                },
                function(error){
                    alert(error);
                }
            );
        }
    };

    return model;
});