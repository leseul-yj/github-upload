// http 使用代理插件
const PORT = 4000;
const http = require('http');
const url = require('url');
const fs = require('fs');
const mine = require('./mine').types;
const path = require('path');
const httpProxy = require('http-proxy');
// 设置代理
const proxy = httpProxy.createProxyServer({
    target: 'http://192.168.3.55:8092',
});
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});

let server = http.createServer(function (req, res) {
    let pathname = path.join(__dirname, url.parse("/webapp"+req.url).pathname);
    if (req.headers['x-requested-with'] =="XMLHttpRequest" ) {
        proxy.web(req, res);
        return;
    }
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }
    fs.exists(pathname, function (exists) {
        if (exists) {
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
            }
            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });
        } else {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.end("<h1>404 Not Found</h1>");
        }
    });
})
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");