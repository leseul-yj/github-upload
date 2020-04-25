const express = require('express');
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const path = require('path');
const app = express();
const port = 5000;
app.use(express.static(path.join(__dirname,'static')))
app.get('/',(req,res) => {
  res.send('Hello world');
});

app.use('/',createProxyMiddleware({
  target: 'http://192.168.3.55:8092/',
  changeOrigin: true,
}));
app.listen(port,function() {
  console.log('启动项目mpmdFront,端口：' + port);
});