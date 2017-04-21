var express    = require('express');
var serveIndex = require('serve-index');

var app = express();

// Serve URLs like /ftp/thing as public/ftp/thing
app.use('./out', serveIndex('/', {'icons': true}));
var listener = app.listen(8888, () => {
    console.log('http://localhost:' + listener.address().port);
});