// Filename: router.js

define([
    'jquery',
    'util/alias-router'
], function ($, AliasRouter) {
    'use strict';

    var AppRouter = AliasRouter.extend({
        aliases: {
            'index': ''
        },

        // Functions
        // ----------------------

        "index": function() {
            require(['page/Index'], function (IndexView) {
                new IndexView({
                    el: $('<div>').appendTo($('#content').empty())
                });
            });
        },

        "default": function() {
            require(['page/404'], function (NotFoundView) {
                new NotFoundView({
                    el: $('<div>').appendTo($('#content').empty())
                });
            });
        }
    });

    var router = new AppRouter();
    Backbone.history.start();
    return router;
});
