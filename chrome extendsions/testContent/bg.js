var fanyiMenuID='';
var word='';
var fanyirs='';
var currentTabId=0;
window.onload = function() {
    console.log('bg has loaded');
    createContextMenu();
    mountMsgListener();
    mountRemoveListener();
}



function createContextMenu() {

   fanyiMenuID=chrome.contextMenus.create({
        title: "fanyi It!",
        contexts: ["selection"] ,//表示在选中了内容的时候右键才出现此菜单
        'id':'UniqueID555',  //for event pages
        "onclick": toFanyiPage
    });
}

function toFanyiPage(){
    console.log('to fanyi page');
    chrome.tabs.query({
      active: true,
      currentWindow: true
    },function(tabs){
        currentTabId=tabs[0].id;
        chrome.tabs.create( {index:tabs[0].index+1,url:'./fanyiRs.html',active:true },function(tab){
            setTimeout(function(){
               chrome.tabs.sendMessage(tab.id, fanyirs, function handler(response) {
                
            });
            },100);
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
                word=message;
                title='翻译'+word;
                chrome.contextMenus.update(fanyiMenuID,{'title':title},function(){});
                fanyi(word);
            }
        }
    });
}

function fanyi(word) {
    var rs = '';
    $.ajax({
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
        fanyirs=data;
    }).fail(function() {
        console.log("error");
    }).always(function() {
        console.log("complete");
    });
}

function mountRemoveListener(){
    chrome.tabs.onRemoved.addListener(function(){
        console.log('a tab was removed and fanyi words index is '+currentTabId);
        chrome.tabs.update(currentTabId,{active:true},function(tab){
        });
    });
    
}