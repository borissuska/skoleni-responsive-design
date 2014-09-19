define(['underscore', 'backbone'], function(_, Backbone) {

    var EnumClass = function() {};
    EnumClass.extend = Backbone.Model.extend;

    return EnumClass.extend({
        // one hour in ms
        fetchPeriod: 60 * 60 * 1000,

        // expected collection model
        model: null,

        // default field to get its value from model
        defaultField: null,

        constructor: function(data) {
            _.extend(this, data);
            this.__refresh();
        },

        get: function(id, field, callback) {
            var enumInst = this;
            this.__refresh(false, function() { // refresh if needed
                var model = this.model.get(id);
                callback.call(enumInst, model && field ? model.get(field) : model)
            });
        },

        where: function(search) {
            // TODO: add this when needed - reload multiple items at once for LazyEnums
            throw "Unsupported operation";
        },

        __refresh: function(force, callback) {
            var enumInst = this;
            if (this.model && (force || !this.lastFetch || new Date() - this.lastFetch > this.fetchPeriod)) {
                enumInst.model.fetch()
                    .success(function(data) {
                        enumInst.lastFetch = new Date();
                        if (callback) {
                            callback.call(enumInst, data);
                        }
                    })
                    .error(function() {
                        if (callback) {
                            callback.call(enumInst);
                        }
                    });
            } else if (callback) {
                callback.call(enumInst);
            }
        }
    });
});