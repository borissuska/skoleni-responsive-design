define(['jquery', 'backbone'], function($, Backbone) {

    // Deep toJSON function
    Backbone.Model.prototype.toJSON = function() {
        var json = _.clone(this.attributes);
        for(var attr in json) {
            if (json[attr] && typeof json[attr].toJSON === 'function') {
                json[attr] = json[attr].toJSON();
            }
        }
        return json;
    };

});