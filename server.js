var express = require('express');
var app = express();
var logger = require('morgan');
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "/");
  res.header('Access-Control-Allow-Methods', "GET, PUT, POST, Delete");
  res.header('Access-Control-Allow-Headers', "Content-Type");
  next();
});

//Load Dir
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));

app.get('*', function(req, res) {
  res.sendFile(process.cwd() + '/public/views/index.html');
});

app.listen(PORT, function(req, res) {
  console.log('Listening on PORT:' + PORT);
});
