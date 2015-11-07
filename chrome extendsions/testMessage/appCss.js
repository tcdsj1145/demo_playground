function applyCss(csstext){
    css = document.createElement('link');
    css.id = 'userCss';
    css.rel = 'stylesheet';
    css.href = 'data:text/css,'+csstext;
    //当然你可以创建一个style标签 然后使用css.innerHTML=csstext;  这样似乎更简洁明确
    document.getElementsByTagName('head')[0].appendChild(css);
}



//接收消息并做回应  不论消息来自popup还是background都可以响应
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender);
        console.log('appCss cs==================');
        applyCss(request);
        sendResponse("user css has executed");
    });



//zcj

//主动发消息到background  ok============================
// chrome.runtime.sendMessage('toBG from content', function(response) {
//   console.log('bg response is '+response);
// });

//监听长连接
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        console.log('PORT MSG ===============');
        console.log(msg);
        port.postMessage('long port');
    });
});
