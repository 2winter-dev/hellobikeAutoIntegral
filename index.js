
auto.waitFor(); // 文档地址：https://docs.hamibot.com/reference/widgetsBasedAutomation
//默认内容
let { post_content, post2_content } = hamibot.env;

//滚动任务
function scroll_updown(count) {
    let i = 0;
    while (i <= count) {
        let r = random();
        gesture(500, [device.width / 2 + r, device.height / 2 + r], [device.width / 2 + r + r, device.height / 2 - 500 + r]);
        sleep(500);
        i++;
    }

}
//回到主页面
function goIndex() {
    app.startActivity({
        packageName: 'com.jingyao.easybike',
        className: 'com.hellobike.evehicle.business.main.EVehicleHomeManagerActivity',
        root: false,
    });
    //进入任务首页
    taskIndex();
}


//回到任务页面
function taskIndex() {


    console.log("扫描任务中，注意：已完成全部每日任务后，将不会再次进入！")
    text("待完成任务").depth(28).indexInParent(0).waitFor()
    //领取能量
    // collectPower();
    sleep(1500);
    let t = text("待完成任务").depth(28).indexInParent(0).findOne(5000);
    console.log("进入任务页面..")
    t && t.parent().click();
    waitForActivity('com.hellobike.bundlelibrary.web.WebActivity')
    console.log("准备开始执行任务");
    //展开任务
    let zk = text("展开").findOne(2000)
    if (zk && zk.parent()) {

        zk.parent().click();

    }
    //启动过签到任务
    sign_task();
    //启动浏览商店任务
    view_store_task();
    //启动发帖任务
    post_task();
    //回到任务首页 启动领取任务
    sleep(3000);
    //循环
    goIndex();

}

//浏览商店任务
function view_store_task() {
    console.log("准备浏览任务..")
    let _c = text("去浏览").findOne(4000);
    let _c2 = text("去访问").findOne(4000);
    if (_c || _c2) {
        if (_c) {
            _c.parent().click();
        }
        if (_c2) {
            _c2.parent().click();
        }
       
        console.log('浏览任务');
        sleep(3000);
        scroll_updown(20);
        console.log('浏览任务结束');
        back();
    } else {
        console.log('无可用浏览任务');
    }




}

//发帖任务
function post_task() {
    console.log("扫描参与任务与看看任务中....")
    let _c2 = text("去参与").findOne(4000);
    if (_c2) {
        _c2.parent().click()
    }
    sleep(2000);
    let toSend = id("takepartin_tv").findOne(4000)
    if (toSend) {
        toSend.click();
    }
    sleep(2000);
    console.log('准备发帖');
    let r = input(post_content + ' ' + (new Date().toString().slice(0, 24)));
    if (r) {
        sleep(2000);
        text("发布").findOne(3000).click();
        sleep(2000);


    } else {
        console.log("无可用帖子任务..");

    }
    back();

}


//签到任务
function sign_task() {
打开应用
goIndex();






