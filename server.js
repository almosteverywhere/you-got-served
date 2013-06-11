var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(request, response) {

  console.log(request.url);

  // var filePath = request.url;
  // filePath = '.' + filePath;


  if (request.method === "GET"){
    var filePath = request.url;
    if (filePath === "/"){
      filePath = "/index.html";
    }
    filePath = '.' + filePath;
    console.log(request);

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
  } else {
    //BAD MSG
  };
}).listen(8888);

console.log("Server has started.");
