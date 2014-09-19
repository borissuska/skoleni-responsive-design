define([
    'backbone',
    'hbs!template/404',
    // others
    'bootstrap'
], function(Backbone, NotFoundTemplate) {

    return Backbone.View.extend({
        initialize: function () {
           this.render();
        },

        render: function () {
            this.$el.html(NotFoundTemplate());
        }
    });
});