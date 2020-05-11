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

let data = {
    "type": "STREAM",
    "data": {
        "channels": ["baoer-msg-pc-724"],
        "content": "{\"MessagePcOut\":{\"Id\":\"663853\",\"Title\":\"从宁德时代业绩说明会上获悉，宁德时代对特斯拉供货时间大概是今年下半年。宁德时代董事长曾毓群表示，供货不限于磷酸铁锂或者三元电池，具体供货产品取决于市场需求（证券时报）\",\"Summary\":\"\",\"Content\":\"\",\"Stocks\":null,\"Image\":\"\",\"SubjIds\":[\"10\",\"9\"],\"BkjInfoArr\":[],\"CreatedAt\":\"2020-05-11T17:14:06+08:00\",\"CreatedAtInSec\":1589188446,\"UpdatedAt\":\"2020-05-11T17:14:06+08:00\",\"UpdatedAtInSec\":1589188446,\"ManualUpdatedAt\":1589188446,\"ManualUpdateTime\":\"0001-01-01T00:00:00Z\",\"ExplainInfos\":null,\"ExplainedInfos\":null,\"NeedExplained\":false,\"Impact\":0,\"SubscribeType\":0,\"IsSubscribed\":false,\"SubscribeSubjectId\":\"0\",\"TitlePath\":\"\",\"SummaryPath\":\"\",\"TitleHlts\":null,\"SummaryHlts\":null,\"IsWithdrawn\":false,\"Watermarks\":\"\",\"WhetherHideImpactFace\":false,\"HasSummary\":false},\"Type\":\"create\",\"OldSubjectIds\":null}"
    },
    "next_cursor": ""
}


function createSocket(){
    let socket = io.connect('http://127.0.0.1:5555');

    // {"command":"ENTER_CHANNEL","data":{"chann_name":"baoer-msg-pc-724"}}
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
        const permission = Notification.permission;
        let notification = undefined;
        if (permission == 'granted') {
            notification = new Notification(data.message, {
                body:data.message,
                icon:'https://2ue.github.io/images/common/avatar.png',
                data:{
                    url: "http://192.168.3.56:9088/index.html"
                },
                timestamp: '1000'
            });
            notification.onclick = (e)=>{
                window.open(notification.data.url, '_blank');
                notification.close();
            }
        }

    });
    
    socket.on('disconnect', () => {
        //clearInterval(interval);
    });
}
Notification.requestPermission().then(permission=>{
    createSocket()
})