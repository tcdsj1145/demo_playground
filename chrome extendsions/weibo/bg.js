var APP_KEY = '3389693454';
var APP_SECRET = 'dcd92487231db5390ce61b809551ac4d';
var REDIRECT_URL = 'http://rakusgittest.sinaapp.com/start.html';
var CODE = '';
var TOKEN = '';
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   sendResponse('BG GOT message');
// });

//接受POPUP的 CODE
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    CODE = message;
    //access token //该接口要求POST  但同时又需要跨域 //bg中没有跨域限制
    $.ajax({
        url: 'https://api.weibo.com/oauth2/access_token',
        // url: 'http://192.168.199.184:1234/access_token',
        type: "POST",
        data: {
            client_id: APP_KEY,
            client_secret: APP_SECRET,
            grant_type: 'authorization_code',
            code: CODE,
            redirect_uri: REDIRECT_URL
        }
    }).then(function(data){
        console.log('=======BG RES ACCESS TOKEN=======');
        console.log(data);

        //传消息到PopUp
        sendResponse(JSON.stringify(data));

    }, function(e){
        console.log(e);
        sendResponse(JSON.stringify(e));
    });
    return true; //如果sendResponse 在异步中 必须要加上return true 这样message就会一直打开直到有响应
});
