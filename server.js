var express    = require('express');
var serveIndex = require('serve-index');
var appRoot = require('app-root-path');
const fs = require('fs');

var app = express();
var images = appRoot.resolve('out/capturedData/');

app.use(express.static(appRoot.resolve('out')));
app.use('out/capturedData/', serveIndex(images, {'icons': true}));

app.get('/list', function(req, res){
    fs.readdir(images, (err, files) => {
        var jpgs = [];

        if (err) {
            res.status(500).send(err);
        }
        else {
            files.forEach((file) => {
                if (file.indexOf('.jpg') != -1) {
                    jpgs.push(file);
                }
            });
            res.send(jpgs);
        }
    });
});

app.post('/good/:name', function(req, res){
    if (!fs.existsSync(images + 'good/')){
        fs.mkdirSync(images + 'good/');
    }

    fs.rename(images + req.params.name, images + 'good/' + req.params.name, (err) => {
        if (err) res.status(500).send(err);
        else res.send('OK');
    });
});

app.post('/bad/:name', function(req, res){
    if (!fs.existsSync(images + 'bad/')){
        fs.mkdirSync(images + 'bad/');
    }

    fs.rename(images + req.params.name, images + 'bad/'  + req.params.name, (err) => {
        if (err) res.status(500).send(err)
        else res.send('OK');
    });
});

var listener = app.listen(8888, () => {
    console.log('http://localhost:' + listener.address().port);
});