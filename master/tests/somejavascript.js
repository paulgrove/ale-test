var should = require("should"),
		JsonApi = require("../lib/core/json_api.js"),
		spawn = require("child_process").spawn,
		Promise = require('bluebird')
	_ = require('lodash');


var servers = [];

var server_path = __dirname +
		(/^win/.test(process.platform) ? "\\" : "/") +
		"json_api_test_server" +
		( /^win/.test(process.platform) ? ".exe" : "");

server_path = server_path.replace(/^\\\\vboxsrv/, "c:"); // path workaround for virtualbox path mapping

describe('JsonApi', function(){
		this.timeout(0);
		describe('without json api server running', function () {
					var api;
					it("should require a host option", function(){
									(function(){
														api = new JsonApi({});
													}).should.throw("option 'host' required");
								});
					it("should instantiate when all required options are provided", function(){
									(function(){
														api = new JsonApi({
																				host: "localhost"
																			});
													}).should.not.throw();
								});
					it("should be an instance of JsonApi", function() {
									api.should.be.an.instanceOf(JsonApi);
								});
					it("should have the correct defaults", function() {
									api.port.should.equal(60005);
									api.timeout.should.equal(10);
								});
					it("should callback with error if cannot connect", function(done){
									this.timeout(api.timeout + 5 * 1000);
									api.req("version", {}, function (err, res) {
														should(res).be.undefined;
														err.should.be.Error;
														done();
													});
								});
				});
});
