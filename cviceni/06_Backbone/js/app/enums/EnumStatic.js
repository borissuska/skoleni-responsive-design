define(['underscore', 'backbone'], function(_, Backbone) {

    var Model = function(model) {
        this.attributes = model;
    };
    Model.prototype.get = function(field) {
        return this.attributes[field];
    };

    var StaticEnumClass = function() {};
    StaticEnumClass.extend = Backbone.Model.extend;

    return StaticEnumClass.extend({
        // expected JSON
        model: null,

        // default field to get its value from model
        defaultField: 'name',

        constructor: function(data) {
            _.extend(this, data);
            var model = {};
            _.each(this.model, function(item, key) {
                if (!item.id) {
                    item.id = key;
                }
                model[key] = new Model(item);
            });
            this.model = model;
        },

        get: function(id, field, callback) {
            if (this.model) {
                var model = this.model[id];

                callback.call(this, model && field ? model.get(field) : model)
            } else {
                callback.call(this);
            }

        },

        find: function(callback) {
            return _.find(this.model, callback)
        },

        each: function(callback) {
            _.each(this.model, callback);
        },

        where: function(search) {
            // TODO: add this when needed
            throw "Unsupported operation";
        }
    });
});