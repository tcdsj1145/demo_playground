var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var path = require('path');


http.createServer(function(req, res) {
    if (req.url === '/upload' && req.method === 'POST') {
        // parse a file uploadreq
        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
                res.writeHead(200, {
                    'content-type': 'text/plain'
                });
                files = files.files; //因为我input file 参数是files
                var fname  ;
                if (Array.isArray(files)) {
                    files.forEach(function(item) {
                            fname = 'img/' + (item.originalFilename + +(new Date()) + '.png');
                            fs.rename(item.path, __dirname + '/' + fname); //移动文件
                            item.fileName = fname;
                            delete item.headers;
                    });
            }
            res.end(JSON.stringify({
                "fields": fields,
                "files": files
            }));
        });

    return;
}
var pathname = url.parse(req.url.substring(1, req.url.length)).pathname;
var realPath = path.join('', pathname); fs.exists(realPath, function(exists) {

    if (!exists) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.write("This req URL " + pathname + " was not found on this server.");
        res.end();
    } else {
        fs.readFile(realPath, "binary", function(err, file) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end(err);
            } else {
                var contentType = "text/html";
                res.writeHead(200, {
                    'Content-Type': contentType
                });
                res.write(file, "binary");
                res.end();
            }
        });
    }


});

// // show a file upload form
// res.writeHead(200, {'content-type': 'text/html'});
// res.end(
//   '<form action="/upload" enctype="multipart/form-data" method="post">'+
//   '<input type="text" name="title"><br>'+
//   '<input type="file" name="upload" multiple="multiple"><br>'+
//   '<input type="submit" value="Upload">'+
//   '</form>'
// );
}).listen(8080);
