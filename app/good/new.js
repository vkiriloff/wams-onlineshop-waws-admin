define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://webinar-onlineshop.azure-mobile.net/';
    var appKey = 'ZHNxhVbjQhZTzUcMuXVQpugLVCIEEv25';

    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey);

    function handleFileSelect() {
        var file = this.files[0];
        model.imageType = file.type;
        var reader = new FileReader();
        reader.onload = (function(f) {
            return function(e) {
                model.image = e.target.result;
            };
        })(file);
        reader.readAsBinaryString(file);
    }

    var model = {
        categories: ko.observableArray([]),

        category: ko.observable(''),
        title: ko.observable(''),
        image: null,
        imageType: null,

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
        compositionComplete: function() {
            $("#file").change(handleFileSelect);
        },
        create: function() {
            client.invokeApi('fileupload', {
                method: 'post',
                body: {
                    content: model.image
                },
                parameters: {
                    type: model.imageType
                }
            }).done(
                function(data){
                    alert(data.result.message);
                },
                function(data){
                    alert(data.result.error);
                });



//            var entity = {
//                title: model.title(),
//                categoryId: model.category().id
//            };
//
//            var table = client.getTable('good');
//
//            table.insert(entity).done(
//                function(result){
//                    alert('inserted');
//                },
//                function(error) {
//                    alert(error);
//                }
//            );
        }
    };

    return model;
});