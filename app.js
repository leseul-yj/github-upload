const express = require('express');
const path = require('path');
//创建一个应用，注意app其实就是一个函数，类似function(req, res) {}
const app = express();
const http = require("http").Server(app);
const io = require("socket.io");
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'src')));

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// socketIO 
const socketIO = io(http);
let timer;
socketIO.on("connection",socket => {
    // 和客户端商量的频道 
    socket.on("message",msg => {
        console.log(msg);
        socketIO.emit("message","接受到客户端推送的消息后 回消息");
    });

    timer = setInterval(() => {
        socketIO.emit("message",Math.random());
    },600000);

    socket.on('error',(err) => {
        console.log(err);
    });

    socket.on("disconnect",_ => { // 客户端断开链接
        clearInterval(timer);
        console.log("客户端关闭链接")
        socketIO.emit("message","链接关闭");
    });
})

//创建application/json解析
var jsonParser = bodyParser.json();

//创建application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedParser);
app.use(jsonParser);
app.get('/',(req,res) => {
    res.send('index.html'); //发送一个请求
})

app.get('/websocket',(req,res) => {
    res.send('index.html');
})
app.post('/addNewMes',jsonParser,(req,res) => {
    console.log(req.body)
    socketIO.emit("message",req.body);
})
// app.get('/management', function (req, res) {
//     res.sendFile(path.join(__dirname, '/src/websocket/management/index.html'));
// })

http.listen(5555,function() { //在3000端口启动
    console.log('Example app listening on port 5555');
})