define([
    'backbone'
], function(Backbone) {

    /**
     * Returns Component base class controller
     */
    return Backbone.View.extend({
        initialize: function(data) {
            var controller = this;
            // re-render when model change
            if (this.model) {
                this.model.on('change', function() {
                    controller.render();
                });
            }
            // render immediate
            this.render();
        },

        render: function() {
            if (this.template) {
                var data = this.__templateData();
                this.$el.html(this.template(data));
            }
        },

        __templateData: function() {
            return this.model.toJSON();
        }
    });
});
