var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var auth = require('http-auth');

var ROOT_DIR = path.join(__dirname);
var config = JSON.parse(fs.readFileSync(ROOT_DIR + '/config.json'));
var basic = auth.basic({
    realm: "Simon Area."
  }, function (username, password, callback) {
    callback(username === config.auth.username && password === config.auth.password);
  }
);

http.createServer(basic, function (req, res) {
   var requestUrl = url.parse(req.url, true);
   switch(requestUrl.pathname) {
    // Index
    case '/':
      fs.readFile('index.html', "binary", function(err, file) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(fs.readFileSync(ROOT_DIR + '/index.html'));
        res.end();
      });
      break;
    // Watching
    case '/watch':
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      });
      res.write("retry: 10000\n\n");

      try {
        var watchFile = requestUrl.query.filePath;

        fs.stat(watchFile, function(err, stat) {
          if(err == null) {
            Tail = require('tail').Tail;

            var tail = new Tail(watchFile);
            tail.on("line", function(data) {
              res.write("data: " + data + "\n\n");
            });

            tail.on("error", function(err) {
              res.write('event: exception\n');
              res.write('data: {"message": " ' + err +'"}\n\n');
            });

            res.on('end', function () {
              tail.unwatch();
            });

          } else if (err.code == 'ENOENT') {
            res.write('event: exception\n');
            res.write('data: {"message": "File is not exists!"}\n\n');
            res.end();
          } else {
            res.write('event: exception\n');
            res.write('data: {"message": "' + err +'"}\n\n');
            res.end();
          }
        });

      } catch(err) {
        res.write('event: exception\n');
        res.write('data: {"message": "' + err +'"}\n\n');
      }
      break;
    default:
      res.writeHead(404);
      res.write("<h1>Not found</h1>");
      res.end();
   }
}).listen(config.server.port);


