//使用notification通知
//1。获取用户权限 Notification.permission是一个静态方法，返回一个string，可以根据
// 返回值判断用户是否授予了通知权限， 返回值有三种
// default 用户还未被询问是否授权，所以通知不会被显示
// granted 表示已经询问过用户，并且用户已经授权了显示通知的权限
// denied 用户已经明确拒绝了显示通知的权限

// 请求权限 Notification.requestPermission(CALLBACK)
// 应用发送通知之前必须要发送通知权限，才能成功进行通知，这个方法支持then方式的链式调用，可以一步调用
Notification.requestPermission((permission) => {
    console.log(permission)
})
// 两种方式是等价的
// Notification.requestPermission().then((permission) => {
//     console.log("用户是允许通知的", permission === 'granted' ? 'ok' : 'no')
// })

// 创建新通知 new Notification(TITLE,OPTIONS)

/*
const options = {
    //通知显示正文。非必须，默认为空
    body: '你的好友XX上线了！',
    //通知显示正文的图片地址。非必须，默认为空
    image: 'imgae url',
    //通知左侧图标。非必须，默认为空
    icon: 'imgae url',
    //通知的分类标记（ID）。非必须，默认为空
    tag: 'test',
    //通知相关联的数据，通常用于方法的回调，传参。非必须，默认为空
    data: '可以是任意数据类型',
    //通知显示延迟的时间。非必须，默认通知实例创建完成就显示
    timestamp: '',
    //通知主体内容的水平展示顺序，有点类似direction属性。非必须，默认值是auto, 可以是ltr或rtl
    dir: 'auto',
    //当没有足够的空间来显示通知本身时，用于表示通知的图像的URL。非必须，默认为空
    badge: 'xxx',
    //通知的语言。非必须默认为空
    lang: '',
    //通知显示时，设备的振动模式。非必须，默认为空
    vibrate: [200, 100, 200],
    //新通知出现是否覆盖旧的通知，覆盖（true）则永远只显示一条通知，不覆盖（false）则会多条通知重叠。非必须，默认为true
    renotify: true,
    //通知是否静音。非必须，默认为false，表示无声
    silent: false,
    //通知声源文件地址。非必须，默认为空
    sound: 'mp3',
    //是否不在屏幕上显示通知信息。非必须，默认为false表示要显示
    noscreen: false,
    //指定通知是否应该粘滞性，即不容易被用户清理。非必须，默认false表示不具粘滞性
    sticky: false,
    //指定通知是否保持活性，知道用户点击或关闭。非必须，默认为false
    requireInteraction: false
}
*/
