define(function (require) {
    var router = require('plugins/router');

    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Home', moduleId: 'home', nav: true },
                { route: 'categories', title: 'Categories', moduleId: 'category/list', nav: true },
                { route: 'category-new', title: 'Category new', moduleId: 'category/new', nav: true },
                { route: 'category-edit/:categoryId', title: 'Category edit', moduleId: 'category/edit', nav: false },
                { route: 'goods', title: 'Goods', moduleId: 'good/list', nav: true },
                { route: 'good-new', title: 'Good new', moduleId: 'good/new', nav: true }
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});