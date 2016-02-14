var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express();

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html',
    requestsCount = 0;

app.use(function (req, res, done) {
	d = new Date();
	console.log("[%s] [%s]", d.toLocaleString(), requestsCount++);
	done();
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

