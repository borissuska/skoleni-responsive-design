// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
//var vhost      = require('vhost');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.get('/employees', function(req, res) {
    res.json([
        {"id": 1, "name": "John", "surname": "Doe"},
        {"id": 2, "name": "Jane", "surname": "Doe"}
    ]);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// serve static content
app.use(express().use(express.static(__dirname)));
//app.use(express().use(vhost('www.domain.com.l', express.static(__dirname))));

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080; 		  // set our port
app.listen(port);
