var connect = require('connect');
var should = require('should');
var mongoose = require('mongoose');
var mc = require('./index.js')(connect);

var m, ms;

before(function() {
  m = mongoose.model("Session");
  m.update = function(query, data, options, cb) {
    cb(null, arguments);
  }
  ms = new mc();
});

describe("test connect mongoose require", function() {
  it("should create model for Session schema", function( /*done*/ ) {
    m.modelName.should.equal("Session");
  });
});

describe("test set", function() {
  it("should calls session update with proper object", function( /*done*/ ) {
    ms.set("abc", {"test":"sweet"},function(err, data){
      data[1].should.eql({ sid: 'abc', data: '{"test":"sweet"}', expires: null });
    });
  });
});

describe("test get", function() {
  it("should ----", function( /*done*/ ) {

  });
});

describe("test destroy", function() {
  it("should ----", function( /*done*/ ) {

  });
});