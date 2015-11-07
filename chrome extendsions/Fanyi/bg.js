var fanyiMenuID = '';
var word = '';
var fanyirs = null;
var fanyirsText = '';
var currentTabId = 0;
window.onload = function() {
    //pageActionShow();
    console.log('bg has loaded');
    createContextMenu();
    mountMsgListener();
    mountRemoveListener();
    //testExeJs();
}

// function testExeJs() {
//     setTimeout(function() {
//         chrome.tabs.query({
//             active: true
//         }, function(tabs) {
//             chrome.tabs.executeScript(tabs[0].id, {
//                 code: 'console.log(\'oooooooooooooo\');'
//             });
//         });
//     }, 1500);
// }


function pageActionShow() {
    chrome.tabs.onActivated.addListener(function(activeInfo) {
        chrome.pageAction.show(activeInfo.tabId);

    });
}

function createContextMenu() {

    fanyiMenuID = chrome.contextMenus.create({
        title: "fanyi It!",
        contexts: ["selection"], //表示在选中了内容的时候右键才出现此菜单
        "onclick": toFanyiPage
    });
}

function toFanyiPage() {
    console.log('to fanyi page');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        currentTabId = tabs[0].id;
        chrome.tabs.create({
            index: tabs[0].index + 1,
            url: 'fanyiRs.html',
            active: true
        }, function(tab) {
            //向新建标签页发送消息要等待标签页创建  //create是异步函数 create木有执行完就会进入回调
            setTimeout(function() {
                chrome.tabs.sendMessage(tab.id, fanyirs, function handler(response) {

                });
            }, 100);
        });
    });

}


function mountMsgListener() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        var res = '';
        if (!sender.tab) {
            sendResponse('response to msg setn by popup');
        } else if (sender.tab) {
            if (message && message.length > 0) {
                console.log('in bg msg listener ');
                word = message;
                title = '翻译' + word;
                chrome.contextMenus.update(fanyiMenuID, {
                    'title': title
                }, function() {});
                fanyi(word);
            }
        }
    });
}


function fanyi(word) {
    var rs = '';
    $.ajax({
        async: false,
        url: 'http://fanyi.youdao.com/openapi.do',
        type: 'GET',
        dataType: 'json',
        data: {
            'keyfrom': 'rakustrans',
            'key': '1506707246',
            'type': 'data',
            'doctype': 'json',
            'version': '1.1',
            'q': word
        },
    }).done(function(data) {
        console.log(data);
        rs = data;
        fanyirs = data; //右键用
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, data, function handler(response) {

            });
        });


    }).fail(function() {
        console.log("error");
    }).always(function() {
        console.log("complete");
    });
    return fanyirsText;
}

function mountRemoveListener() {
    chrome.tabs.onRemoved.addListener(function() {
        console.log('a tab was removed and fanyi words index is ' + currentTabId);
        chrome.tabs.update(currentTabId, {
            active: true
        }, function(tab) {});
    });

}
