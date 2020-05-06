// Node原生的http模块中，是将用户请求数据封装到了用于请求的对象req中，这个对象是一个IncomingMessage，
// 该对象同时也是一个可读流对象。在原生Http服务器，或不依赖第三方解析模块时，可以用下面的方法请求并且解析请求体

const http = require('http');

http.createServer(function(req, res){
    if(req.method.toLowerCase() === 'post'){
        let body = '';
        //此步骤为接收数据
        req.on('data', function(chunk){
            body += chunk;
        });
        //开始解析
        req.on('end', function(){
            if(req.headers['content-type'].indexOf('application/json')!==-1){
                JSON.parse(body);
            }else if(req.headers['content-type'].indexOf('application/octet-stream')!==-1){
                //Rwa格式请求体解析
            }else if(req.headers['content-type'].indexOf('text/plain')!==-1){
                //text文本格式请求体解析
            }else if(req.headers['content-type'].indexOf('application/x-www-form-urlencoded')!==-1){
                //url-encoded格式请求体解析
            }else{
            //其他格式解析
            }
        })
    }else{
        res.end('其他方式提交')
    }
}).listen(3000)