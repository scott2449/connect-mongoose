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

    var server = express.createServer(express.cookieParser(), express.session({
				secret : "secret",
				store : new sessionStore()
			}));

## Tests

	TBD