var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'js',
    paths: {
        moduleC: 'module-B'
    }
});
