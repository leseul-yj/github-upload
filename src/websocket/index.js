let serverMes = document.getElementById("serverMes");
let clientMes = document.getElementById("clientMes");
// function socketConnect(url) {
//     // 与服务器建立连接
//     let ws = new WebSocket(url);

//     ws.open = (e) => {
//         //console.log('success', e);
//         ws.send('发送消息给服务端');
//         clientMes.innerHTML += `<p>${e}</p>`;
//     }

//     ws.onmessage = (e) => {
//         //console.log('服务器返回：', e.data);
//         serverMes.innerHTML += `<p>${e.data}</p>`;
//     }
//     return ws
// }
// socket.io引入成功后，可通过io()生成客户端所需的socket对象。
// 'ws://121.40.165.18:8800' 是测试地址
// let wsValue = socketConnect('ws://121.40.165.18:8800');

let socket = io('http://127.0.0.0:3333');

let interval = setTimeInterval(() => {
    socket.emmit('random', Math.random());
}, 500);

socket.on('warn', count => {
    console.log('warning count : ' + count);
});
// 与客户端对应的接收指定的消息
socket.on('client message', (data) => {
    cosnole.log(data); // hi server
});
socket.on('disconnect', () => {
    clearInterval(interval);
});