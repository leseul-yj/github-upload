let serverMes = document.getElementById("serverMes");

function socketConnect(url) {
    // 与服务器建立连接
    let ws = new WebSocket(url);

    ws.open = (e) => {
        console.log('success', e);
        ws.send('发送消息给服务端');
    }

    ws.onmessage = (e) => {
        //console.log('服务器返回：', e.data);
        serverMes.innerHTML += `<p>${e.data}</p>`;
    }
    return ws
}
// 'ws://121.40.165.18:8800' 是测试地址
let wsValue = socketConnect('ws://121.40.165.18:8800');