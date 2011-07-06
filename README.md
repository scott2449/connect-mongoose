# connect-mongoose

connect-mongoose is a mongoDB session store backed by mongoose(http://github.com/LearnBoost/mongoose).

## Installation

via npm:

    TBD ... $ npm install connect-mongoose

## Options

	TBD - See example, until future versions warrant more complex configuration

## Example

You have a complete example on `example/index.js`.

    var connect = require('connect')
	var sessionStore = require("connect-mongoose")(express);
	var http = require('http');

    var server = express.createServer(express.cookieParser(), express.session({
				secret : "secret",
				store : new sessionStore()
			}));
			
	mongoose.connection.on("open", function() {
		http.createServer(function (req, res) {
		  	res.writeHead(200, {'Content-Type': 'text/plain'});
		  	response.write(req.session); //this is your session object
		  	res.end('Hello World\n');
		}).listen(1337, "127.0.0.1");
	});		
			
	mongoose.connect("mongodb://localhost/dev");

## Tests

	TBD