# connect-mongoose

connect-mongoose is a mongoDB session store backed by mongoose(http://github.com/LearnBoost/mongoose).

## Installation

via npm:

    TBD ... $ npm install connect-mongoose

## Options

	TBD - See example, until future versions warrant more complex configuration

## Example

You have a complete example on `example/index.js`.

    var connect = require('express');
	var sessionStore = require("connect-mongoose")(connect);
	var mongoose = require("mongoose");
	
	mongoose.connection.on("open", function() {
		var server = connect.createServer(connect.cookieParser(), connect.session({
			secret : "secret"
			store : new sessionStore()
		}));
	
		server.use('/', connect.router(function(app) {
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