const express = require('express');
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const path = require('path');
const app = express();
const port = 6666;
// path.join方法 将多个路径字段 拼接成一个字符串
app.use(express.static(path.join(__dirname,'src')))
console.log(__dirname);
app.get('/', (req, res) => {
  res.send('Hello world');
});

// app.post('/addMessage', (req, res) => {
//   let resData = {
//     mesg: '保存成功！'
//   }
//   res.send(JSON.stringify(resData))
// })

// app.use('/', createProxyMiddleware({
//   target: 'http://192.168.3.55:8092/',
//   changeOrigin: true,
// }));

app.listen(port, function () {
  console.log('启动项目,端口：' + port);
});