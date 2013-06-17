var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var ex = require('express');

var myhandler = function (req, res){
    console.log("handler for getting index");

    var mymethod = req.method
    var myurl = req.url
    console.log("url and method in handler" + mymethod + myurl);

    if (myurl === "/"){
        myurl = "/index.html";
    }
    myurl = '.' + myurl;

    //does the file we want exist?
    fs.exists(myurl, function(boolExists) {
        if (boolExists) {

            fs.readFile(myurl, "utf8", function(err, data){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(data);
                res.end();
            });
        }
        else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write("404: File not found.");
            res.end();
        }
    });
}

function is_allowed_route(req) {
    var myrequest = req;
    var myurl = req.url;
    var mymethod = req.method;

    console.log("request is:" + [req.url, req.method] );

    if ([req.url, req.method] in allowed_routes) {
        console.log("This is an allowed route!");
        return true;
    }
    else {
        return false;
    }
}

function i_listen_to_stuff(req, res) {

    var myurl = req.url;
    var mymethod = req.method;
    console.log("req is:" + myurl);
    // do we need to pass req, is this in the closure?

    //hmm i'm not sure i understand what mary thought i should do
    //if i have a general handler, how can i call it before i know i have a valid route?
    //if my route doesn't exist, it won't have a handler attached to it
    //Handler.handle, how to write an abstract object like this?
    if (is_allowed_route(req)) {
        //call the handler
        allowed_routes[[myurl, mymethod]](req, res);
        //ok some error handling should be happening here
    }
    else {
        console.log("This is not an allowed route.");
        //some error page should be printed out here.
    }
}

var allowed_routes = {};
//ok this is some badness, should be able to have / as the root and then
allowed_routes[["/", "GET"]] = myhandler;
allowed_routes[["/awesome.txt", "GET"]] = myhandler;
console.log(allowed_routes);


function startServer() {

    http.createServer(function(req, res) {

        i_listen_to_stuff(req, res);

    }).listen(8888);

}

exports.startServer = startServer;

