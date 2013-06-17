var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var ex = require('express');


var myhandler = function get_index(){
    console.log("handler for getting index");
}

var allowed_routes = {};
allowed_routes[["/", "GET"]] = myhandler;
console.log(allowed_routes);



http.createServer(function(request, response) {

  //console.log(request.url);
  i_listen_to_stuff(request);

  if (request.method === "GET"){
    var filePath = request.url;
    if (filePath === "/"){
      filePath = "/index.html";
    }
    filePath = '.' + filePath;


    fs.exists(filePath, function(boolExists) {
      if (boolExists) {
        fs.readFile(filePath, "utf8", function(err, data){
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data);
          response.end();
        });
      }
      else {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404: File not found.");
        response.end();
      }
    });
  } else if (request.method === "POST") {

      //ok we're giving up on this as there is no way to be get the binary image data.

      var body = '';
      request.on('data', function (data) {
        console.log(typeof data );
        body += data;
      });
      request.on('end', function () {
       
        console.log("UPLOAD FILE!!!!!!");
        console.log(request.uploadfile);

      });

      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("I am posting some stuff!");
      response.end();

  } else {
    //BAD MSG
  };
}).listen(8888);

function is_allowed_route(request) {
    var myrequest = request;
    var myurl = request.url;
    var mymethod = request.method;

    console.log("request is:" + [request.url, request.method] );

    if ([request.url, request.method] in allowed_routes) {
        console.log("This is an allowed route!");
        return true;
    }
    else {
        return false;
    }
}

function i_listen_to_stuff(request) {
    //// YAY!!! DONE!!!!!
    var myurl = request.url;
    var mymethod = request.method;
    console.log("request is:" + myurl);
    // do we need to pass request, is this in the closure?
    if (is_allowed_route(request)) {
        //call the handler
        allowed_routes[[myurl, mymethod]]();
        //ok some error handling should be happening here
    }
    else {
       console.log("This is not an allowed route.");
       //some error page should be printed out here.
    }
}

function get_index(){
    console.log("handler for getting index");
}

console.log("Server has started.");
