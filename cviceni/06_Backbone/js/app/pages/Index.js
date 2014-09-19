define([
    'backbone',
    'router',
    'hbs!template/Index',
    // others
    'bootstrap'
], function(Backbone, Router, IndexTemplate) {

    return Backbone.View.extend({
        initialize: function () {
           this.render();
        },

        render: function () {
            this.$el.html(IndexTemplate());
        },

        events: {
            'click .link': 'followLink'
        },

        followLink: function (event) {
//            Router.navigate(
//                'alias', {
//                      // data
//                }, {
//                    trigger: true
//                });
        }
    });
});