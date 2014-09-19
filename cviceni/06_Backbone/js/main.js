// Require.js allows us to configure shortcut alias
requirejs.config({
    baseUrl: 'js',
	paths: {
		// libraries
		jquery:		['//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min', 'libs/jquery/jquery-2.1.1.min'],
		underscore:	['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min', 'libs/underscore/underscore-min'],
        handlebars: 'libs/handlebars/handlebars-v1.3.0',
        backbone:	['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min', 'libs/backbone/backbone-min'],
        bootstrap:	['//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min', 'libs/bootstrap/bootstrap.min'],

		// Shorthands
        model:		'app/models',
        collection:	'app/collections',
        page:		'app/pages',
        util:	    'app/utils',
        enum:       'app/enums',
		template:	'app/templates',
        component:  'app/components',

		// Require.js plugins
		text:		'libs/require/plugins/text',
        json:       'libs/require/plugins/json',
        async:      'libs/require/plugins/async'
	},

	shim: {
		backbone: {
			deps: ['underscore', 'jquery', 'handlebars'],
			exports: "Backbone"
		},
        handlebars: {
            exports: "Handlebars"
        },
        bootstrap: {
            deps: ["jquery"]
        }
	},

    packages: [{
        name: 'hbs',
        location: 'libs/require/plugins/hbs',
        main: 'hbs'
    }],

    hbs: {
        templateExtension: '.hbs',
        compilerPath: 'libs/handlebars/handlebars-v1.3.0'
    }
});

// Load our app module and pass it to our definition function
require([
    'app'
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
