var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
	proxy = require('express-http-proxy');

var HOSTNAME = 'localhost',
    PORT = 80,
    PUBLIC_DIR = __dirname + '/public_html',
    requestsCount = 0;

app.use(function (req, res, done) {
	var date = Date();
	console.log("[%s] [%s] [%s]", requestsCount++, req.url.toLocaleString(), date.toLocaleString());
	done();
});

app.listen(PORT, function () {
	console.log("cpvls proxy server listening at http://%s:%s", HOSTNAME, PORT);
});

app.use('/', proxy('http://192.168.1.42:8800/', {
	forwardPath: function(req, res) {
		console.log('proxy', require('url').parse(req.url).path);
		return require('url').parse(req.url).path;
	}
}));
