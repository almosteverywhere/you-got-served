var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var ex = require('express');

//CODE IS a BIG MESS WILL BE CLEANED UP!!! 

//how to generalize this so we can get set the path ourselves.
//start by setting the path in a variable.
//for this route
//if the request is get
//then do this
//if the request is post
//then do this

//ok, can we write a function that says, requested url is this?

//var allowed_routes = new Object();
//allowed_routes[0].name = "/";
//allowe
////hmm how to access this stuff? is this an object?
//allowed_routes['/'] = (["POST", "GET"], my_index_function(request) );
// we have an object like allowed_routes.name
// allowed_routes.name.methods
// allowed_routes.name.method.handler

var myhandler = function get_index(){
    console.log("handler for getting index");
}

var allowed_routes = new Object();
allowed_routes["/"] = {};
/// THIS WORKS!
//allowed_routes["/"] = ["get", function() { console.log("i am a /"); } ];
allowed_routes["/"] = ["GET", myhandler];

//// so this works as a function call, there must be a better way!!!
///foo["myname"][0][1]();

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
        //console.log(body)
        //var POST = qs.parse(body);
        //console.log(POST)
            // use POST
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


function i_listen_to_stuff(request) {
    var myurl = request.url;
    var mymethod = request.method;
    console.log("request is:" + myurl);
    // if it's in there, it will be not =1
    var index = allowed_routes[myurl].indexOf(mymethod);
    if (index > -1) {
        //then call the handler for this thing
        //ok there's got to be a better way for this
        // not using arrays!!!
        //let's make a real object
        allowed_routes[myurl][1]();
    }
    //console.log(allowed_routes[request.url]);
    // can we use this url
//    if (request.url in allowed_routes) {
//        // ok, is the request method good?
//        var index = allowed_routes[request.url].indexOf(request.method);
//        if (index > -1 ) {
//        console.log("this is an allowed route");
//            //send all this info to some things that says
//            // what to do for this action!
//        //ok call the function that deals with this!
//        // how to call this function???
//
//        allowed_routes[request.url].request.method[index].handler();
//    }
//        else {
//            console.log("this route is not allowed");
//            //some kind of error should be happening!
//        }
//
//    }
//
//     else {
//            console.log("this route is not allowed");
//            //some kind of error page should be happening
//        }

}

function get_index(){
    console.log("handler for getting index");
}

console.log("Server has started.");
