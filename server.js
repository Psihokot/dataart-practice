// var http = require('http');
// var url = require('url');
// var static = require('node-static');
// var file = new static.Server('.', {
//     cache: 0
// });
//
//
// function accept(req, res) {
//     file.serve(req, res);
// }
//
// http.createServer(accept).listen(8080);
var http = require('http');
var static = require('node-static');

var fileServer = new static.Server('.');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(8080);