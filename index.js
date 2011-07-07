/*
 * Copyright (c) 2007-2011 Scott Rahner, N1 Concepts LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * http://www.opensource.org/licenses/mit-license.php
 */

//TODO: Allow the passing of authentication params and/or a different mongoose instance. This one depends on the fact that the global mongoose object contains a valid connection
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

SessionSchema = new Schema({
	"sid" : {
		"type" : String,
		"required" : true,
		"unique" : true
	},
	"data" : {
		"type" : String,
		"default" : "{}"
	},
	"expires" : {
		"type" : Date,
		"index" : true
	}
});

Session = mongoose.model("Session", SessionSchema);

module.exports = function(connect) {

	var Store = connect.session.Store;

	function MongooseStore(options) {
		Store.call(this, options);
	}

	MongooseStore.prototype = new Store();

	MongooseStore.prototype.get = function(sid, cb) {
		Session.findOne({
			"sid" : sid
		}, function(err, results) {
			if (!results) {
				return cb();
			}
			if (err) {
				cb(err);
			} else {
				cb(null, JSON.parse(results.data));
			}
		});
	};

	MongooseStore.prototype.set = function(sid, data, cb) {
		Session.update({
			"sid" : sid
		}, {
			"sid" : sid,
			"data" : JSON.stringify(data),
			"expires" : null
		}, {
			upsert : true
		}, cb);
	};

	MongooseStore.prototype.destroy = function(sid, cb) {
		Session.remove({
			sid : sid
		}, cb);
	};

	return MongooseStore;

};
