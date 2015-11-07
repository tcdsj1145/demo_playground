var APP_KEY = '3389693454';
var APP_SECRET = 'dcd92487231db5390ce61b809551ac4d';
var REDIRECT_URL = 'http://rakusgittest.sinaapp.com/start.html';
var CODE = '';
var TOKEN = '';
var UID = '';
var tokenContainer = {};
//POST Message 监听
window.addEventListener('message', function(e){
    CODE = e.data;
    console.log('Post message got code ',CODE);
    //传CODE消息到BG
    chrome.runtime.sendMessage(CODE, function(response) {
        console.log('EXPECT access_token==========');
        tokenContainer = JSON.parse(response);
        TOKEN = tokenContainer.access_token;
        UID = tokenContainer.uid;
        console.log(response);
        getWeibo();
    });
},false);


function getWeibo(){
    homeTimeLine();
    bindEvents();

}

function bindEvents(){
    container.addEventListener('click', function(e){
        var target = e.target;
        var content , url;
        if(findParentByClass('ret-content', target)){
            var retContent = findParentByClass('ret-content', target);
            url = retContent.getAttribute('ret-data-url');
        }else if(findParentByClass('content', target)){
            var retContent = findParentByClass('content', target);
            url = retContent.getAttribute('data-url');
        }
        console.log('CLICK', url);
        openNewTab(url);

    },false);
    function findParentByClass(pclass, target){
        var ele = target;
        if(ele.className.indexOf(pclass) != -1){
            return ele;
        }
        while(ele && ele.className.indexOf(pclass) == -1){
            ele = ele.parentElement; //必须是element  否则到document上取className回报错
        }
        return ele;
    }
}

function openNewTab(url){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        currentTabId = tabs[0].id;
        chrome.tabs.create({
            index: tabs[0].index + 1,
            url: url,
            active: true
        }, function(tab) {
        });
    });
}

function homeTimeLine(){
    // https://api.weibo.com/2/statuses/home_timeline.json
    $.ajax({
        url: 'https://api.weibo.com/2/statuses/home_timeline.json',
        type: 'get',
        dataType: 'json',
        data: {
            source: APP_KEY,
            access_token: TOKEN
        }
    }).then(function(data){
        console.log('==========WEIBO ==============');
        console.log(data);
        handleTimeLine(data);
    }, function(e){
        console.log(e);
    });
}

function handleTimeLine(data){
    var container = document.querySelector('#container');
    var statuses = data.statuses;
    var allhtml = '';
    statuses.forEach(function(stat){
        console.group();
        console.log(stat.text);
        //weibo real URL
        var mid = new SinaWeiboUtility().id2mid(stat.mid);
        stat.weiboURL = 'http://weibo.com/' + stat.user.id + '/' + mid;
        if(stat.retweeted_status){
            stat.retweeted_status.retWeiboURL = 'http://weibo.com/' + stat.retweeted_status.user.id + '/' + new SinaWeiboUtility().id2mid(stat.retweeted_status.mid);;
        }

        // template
        var temp = $('#aweibo').html();
        var templateFun = _.template(temp);
        var html = templateFun({data:stat});
        allhtml += html;
        console.groupEnd();
    });
    container.innerHTML = allhtml;
}