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

let socket = io.connect('http://127.0.0.1:5555');

socket.on('connect', function () {
    console.log('连接成功');
});
console.log('socket', socket);

socket.on('message', result => {
    result = JSON.parse(result);
    if (result.status === "false") return;
    const {
        data
    } = result;
    clientMes.innerHTML += `<p class="wsReceiveMes"><span class="text">${data.message}</span><span class="time">${data.createTime}</span></p>`;
});

socket.on('disconnect', () => {
    //clearInterval(interval);
});