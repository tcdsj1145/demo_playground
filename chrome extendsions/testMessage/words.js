console.log('word.js============================');

rightClickListener();
mountGetMsg();


function rightClickListener() {
    document.body.addEventListener('mousedown', function(event) {
        if (event.button == 2) {
            // chrome.runtime.sendMessage(selectText(), function(response) {
            // });
        }
    }, false);
    document.body.addEventListener('dblclick', function(event) {
        //fanyi(selectText());//这样做可以 //不过似乎就和bg没有什么交互了//有悖于本例子的初衷
        //
        //我没有在回调中传翻译结果
        chrome.runtime.sendMessage(selectText(), function(response) {});

    },false);
}

function handleFanyirs(data) {
    var str = '';
    str += data.translation[0] + "  ";
    var item = null;
    for (var i = 0; i <= data.web.length - 1; i++) {
        item = data.web[i];
        str += "  " + item.key + "  ";
        for (var j = 0; j <= item.value.length - 1; j++) {
            var itemV = item.value[j];
            str += itemV + " , ";
        };
    };
    return str;
}

function mountGetMsg() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log('content get msg ==============');
        console.log(message);
        notif({
            msg: handleFanyirs(message),
            type: "info"
        });
    });
}


function selectText() {
    if (document.selection) { //For ie
        return document.selection.createRange().text;
    } else {
        console.log('selection is ' + window.getSelection());
        return window.getSelection().toString();
    }
}

// function fanyi(word) {
//     var rs = '';
//     $.ajax({
//         url: 'http://fanyi.youdao.com/openapi.do',
//         type: 'GET',
//         dataType: 'json',
//         data: {
//             'keyfrom': 'rakustrans',
//             'key': '1506707246',
//             'type': 'data',
//             'doctype': 'json',
//             'version': '1.1',
//             'q': word
//         },
//     }).done(function(data) {
//         console.log(data);
//         notif({
//             msg: data,
//             type: "success"
//         });
//     }).fail(function() {
//         console.log("error");
//     }).always(function() {
//         console.log("complete");
//     });
// }
