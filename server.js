var express    = require('express');
var serveIndex = require('serve-index');
var appRoot = require('app-root-path');

var app = express();
var images = appRoot.resolve('out');

// Serve URLs like /ftp/thing as public/ftp/thing
app.use(express.static(images));
app.use('/', serveIndex(images, {'icons': true}));

console.log(images);

var listener = app.listen(8888, () => {
    console.log('http://localhost:' + listener.address().port);
});