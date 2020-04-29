const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function (req, res) {
    res.send('index.html'); //发送一个请求
})

app.get('/websocket', function (req, res) {
    res.send('index.html'); //发送一个请求
})

app.get('/management', function (req, res) {
    res.send('management'); //发送一个请求
})

app.listen(3333, function () { //在3000端口启动
    console.log('Example app listening on port 3333');
})