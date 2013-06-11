var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(request, response) {

  console.log(request.url);

  var filePath = request.url;
  if (filePath === "/"){
      filePath = "./index.html";
  }
  filePath = '.' + filePath
  console.log("true or false" + fs.existsSync(filePath));
  if (fs.existsSync(filePath)){

    var file = fs.readFileSync(filePath, "utf8");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(file);

  }

  else {
      response.writeHead(404, {"Content-Type": "text/html"});
      response.write("404: ile not found.");
  }

  response.end();
}).listen(8888);

console.log("Server has started.");