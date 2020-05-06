//import moment from 'moment';
let addMesgText = document.getElementById("addMesg");
let btnSubit = document.getElementById("btnSubmit");

btnSubit.addEventListener('click', function () {
    // let postData = {
    //     createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     message: addMesgText.textContent
    // }
    let postData = {
        createTime: '2020-04-29 13:56:00',
        message: addMesgText.value
    };
    fetch("/addNewMes", {
        method: "POST",
        // 不添加header 服务器那边收到的是空
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(postData),
    }).then((res) => {

    })
})