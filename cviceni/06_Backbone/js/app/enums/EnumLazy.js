define(['underscore', 'backbone'], function(_, Backbone) {

    var Collection = function() {
        this.items = {};
        this.waitings = {};
    };
    Collection.prototype.add = function(item) {
        this.items[item.id] = item;
    };
    Collection.prototype.get = function(id, callback) {
        var item = this.items[id],
            collection = this;
        if (callback && item) {
            if (item.inProgress) {
                setTimeout(function() {
                    collection.get(id, callback);
                }, 50);
            } else {
                callback.call(item, item);
            }
        }

        return item;
    };
    Collection.prototype.wait = function(id, callback) {
        var stack = this.waitings[id];
        if (!stack) {
            this.waitings[id] = [callback];
        } else {
            this.waitings[id].push(callback);
        }
    };


    var LazyEnumClass = function() {};
    LazyEnumClass.extend = Backbone.Model.extend;

    return LazyEnumClass.extend({
        // one hour in ms
        fetchPeriod: 60 * 60 * 1000,

        // collection of items
        collection: null,

        // expected model class
        modelClass: null,

        // default field to get its value from model
        defaultField: null,

        constructor: function(data) {
            _.extend(this, data);
            this.collection = new Collection();
        },

        get: function(id, field, callback) {
            var enumInst = this;
            this.__fetch(id, false, function(model) { // refresh if needed
                callback.call(enumInst, field ? model.model.get(field) : model.model);
            });
        },

        where: function(search) {
            // TODO: add this when needed - reload multiple items at once for LazyEnums
            throw "Unsupported operation";
        },

        __fetch: function(id, force, callback) {
            if (this.collection) {
                var enumInst = this,
                    item = enumInst.collection.get(id, function(item) {
                        callback.call(enumInst, item);
                    }) || { lastFetch: null, value: null, inProgress:false };

                if (!item.inProgress) {
                    if (force || !item.lastFetch || new Date() - item.lastFetch > enumInst.fetchPeriod) {
                        var model = new enumInst.modelClass({ "id": id });

                        item.id = id;
                        item.inProgress = true;
                        enumInst.collection.add(item);

                        model.fetch()
                            .success(function (data) {
                                item.id = data.id;
                                item.inProgress = false;
                                item.lastFetch = new Date();
                                item.model = model;

                                // enumInst.collection.add(item);
                                if (callback) {
                                    callback.call(enumInst, item);
                                }
                            })
                            .error(function () {
                                if (callback) {
                                    callback.call(enumInst);
                                }
                            });
                    } else if (callback) {
                        callback.call(this);
                    }
                }
            } else {
                callback.call(this);
            }
        }
    });
});