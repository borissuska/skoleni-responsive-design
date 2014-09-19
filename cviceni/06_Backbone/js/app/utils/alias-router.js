define(['backbone'], function(Backbone) {

    /**
     * Class to hold url aliases for enhanced router
     * @param init
     * @constructor
     */
    var UrlAlias = function(init) {
        var re = /:(\w[\d\w]*)/g,
            match;

        this.pattern = init.pattern || '';
        this.method = init.method || null;
        this.variables = [];


        // get all matched
        while((match = re.exec(this.pattern)) != null) {
            this.variables.push(match[1]);
        }
    };

    /**
     * Replace variables in pattern by values
     * @param {Array} values values to apply
     * @returns {String} final URL
     */
    UrlAlias.prototype.applyValues = function(values) {
        var url = this.pattern;
        for (var i=0; i<this.variables.length; i++) {
            var v = this.variables[i],
                value = values[v] || '';
            url = url.replace(':' + v, encodeURIComponent(value));
        }
        return url;
    };

    /**
     * Map arguments to variable names and create object.
     * It is based on arguments values and variables names order.
     * @param {Array} arguments
     * @returns {object} object
     */
    UrlAlias.prototype.getModel = function(args) {
        var model = {};
        for (var i=0; i<this.variables.length; i++) {
            model[this.variables[i]] = args[i] || null;
        }
        return model;
    };

    return Backbone.Router.extend({
        aliases: {},

        initialize: function() {
            // fallback URL
            this.route('*actions', 'default');

            for (var alias in this.aliases) {
                if (this.aliases.hasOwnProperty(alias)) {
                    var urlAlias = this.aliases[alias];
                    if (typeof urlAlias === 'string') {
                        urlAlias = new UrlAlias({
                            pattern: urlAlias,
                            method: alias
                        });
                        this.aliases[alias] = urlAlias;
                    } else if (_.isObject(urlAlias) && !_.isArray(urlAlias) && !_.isFunction(urlAlias)) {
                        urlAlias = new UrlAlias(urlAlias);
                        this.aliases[alias] = urlAlias;
                    }

                    this.route(
                        urlAlias.pattern,
                            !urlAlias.method || typeof urlAlias.method === 'function' ? alias : urlAlias.method,
                            typeof urlAlias.method === 'function' ? urlAlias.method : null
                    );
                }
            }
        },

        /**
         * Navigate by URL alias
         * @param {string} alias
         * @param {Array} data
         * @param {{}} options
         * @returns {string}
         */
        navigate: function(alias, data, options) {
            AppRouter.__super__.navigate.call(this, this.link(alias, data), options);
        },

        /**
         * Get URL link by URL alias filled by data
         * @param {string} alias
         * @param {Array} data
         * @returns {string}
         */
        link: function(alias, data) {
            var urlAlias = this.aliases[alias] || null,
                url = urlAlias ? urlAlias.pattern : '';

            // apply variables
            for (var v in data) {
                if (data.hasOwnProperty(v)) {
                    var value = data[v];
                    if (value !== null) {
                        // replace all variables
                        url = url.replace(new RegExp('\\:' + v, 'g'), encodeURIComponent(value));
                    }
                }
            }

            // remove unused optional attributes
            return url.replace(/(\([^\)]*:[^\)]*\)|[\(\)])/g, '');
        },

        /**
         * Map arguments to variable names and create object.
         * It is based on arguments values and variables names order.
         * @param {string} alias url alias name
         * @param {Array} args data passed to route callback function
         * @returns {{}} model
         */
        getModel: function(alias, args) {
            var urlAlias = this.aliases[alias] || null,
                model = {};
            for (var i=0; i<urlAlias.variables.length; i++) {
                model[urlAlias.variables[i]] = args[i] || null;
            }
            return model;
        }
    });
});