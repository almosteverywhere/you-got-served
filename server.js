var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var ex = require('express');

//how to generalize this so we can get set the path ourselves.
//start by setting the path in a variable.
//for this route
//if the request is get
//then do this
//if the request is post
//then do this

//ok, can we write a function that says, requested url is this?



http.createServer(function(request, response) {

  console.log(request.url);

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
        console.log("UPLOAD FILE!!!!!!")
        //console.log(POST['uploadfile'])

      });

      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("I am posting some stuff!");
      response.end();

  } else {
    //BAD MSG
  };
}).listen(8888);


function i_listen_to_stuff(request) {
    console.log("request is:" + )
}

console.log("Server has started.");
