# connect-mongoose

connect-mongoose is a mongoDB session store backed by mongoose(http://github.com/LearnBoost/mongoose).

## Installation

via npm:

    TBD ... $ npm install connect-mongoose

## Options

	TBD - See example, until future versions warrant more complex configuration

## Example

Keep in mind this module is supposed to help folks already using mongoose leverage it for their sessions, so at the moment it does not spin up it's own instance. In the future I want to have the ability to pass configuration for an instance or it will spin up one by default. Also looking to support authentication etc.. For now that can all be managed by setting up / reusing an existing mongoose connection.

    var connect = require('connect');
	var sessionStore = require("connect-mongoose")(connect);
	var mongoose = require("mongoose");
	
	mongoose.connection.on("open", function() {
		var server = connect.createServer(connect.cookieParser(), connect.session({
			secret : "secret",
			store : new sessionStore()
		}));
	
		server.use(connect.router(function(app) {
			app.get('/', function(req, res) {
				res.write(JSON.stringify(req.session));
				res.end("Sweet!");
			});
		}));
	
		server.listen(1337);
	});
	
	mongoose.connect("mongodb://localhost/dev");

## Tests

	TBD