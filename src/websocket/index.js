// 请求权限 Notification.requestPermission(CALLBACK)
// 应用发送通知之前必须要发送通知权限，才能成功进行通知，这个方法支持then方式的链式调用，可以一步调用


const permission = Notification.permission;
if(permission == 'granted') {
    alert("grunt");
} else {
    alert("denied")
}

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

socket.on('connect',function() {
    console.log('连接成功');
});
console.log('socket',socket);

socket.on('message',result => {
    result = JSON.parse(result);
    if(result.status === "false") return;
    const {
        data
    } = result;
    clientMes.innerHTML += `<p class="wsReceiveMes"><span class="text">${data.message}</span><span class="time">${data.createTime}</span></p>`;
});

socket.on('disconnect',() => {
    //clearInterval(interval);
});

//使用notification通知
//1。获取用户权限 Notification.permission是一个静态方法，返回一个string，可以根据
// 返回值判断用户是否授予了通知权限， 返回值有三种
// default 用户还未被询问是否授权，所以通知不会被显示
// granted 表示已经询问过用户，并且用户已经授权了显示通知的权限
// denied 用户已经明确拒绝了显示通知的权限
