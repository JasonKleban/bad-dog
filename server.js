var express    = require('express');
var serveIndex = require('serve-index');
var appRoot = require('app-root-path');
const fs = require('fs');

var app = express();
var images = appRoot.resolve('out/capturedData/');

app.use(express.static(appRoot.resolve('out')));
app.use('/capturedData', serveIndex(images, {'icons': true}));

app.get('/list', function(req, res){
    fs.readdir(images, (err, files) => {
        var pngs = [];

        if (files) {
            files.forEach((file) => {
                if (file.indexOf('.png') != -1) {
                    pngs.push(file);
                }
            });
            res.send(pngs);
        }
        else {
            res.status(500).send('files is falsey');
        }
    });
});

app.post('/good/:name', function(req, res){
    fs.rename(images + req.query.name, images + '/good/' + req.query.name, (err) => {
        if (err) res.status(500).send(err);
        else res.send('OK');
    });
});

app.post('/bad/:name', function(req, res){
    fs.rename(images + req.query.name, images + '/bad/'  + req.query.name, (err) => {
        if (err) res.status(500).send(err)
        else res.send('OK');
    });
});

var listener = app.listen(8888, () => {
    console.log('http://localhost:' + listener.address().port);
});