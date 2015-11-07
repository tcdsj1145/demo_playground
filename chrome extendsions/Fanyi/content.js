console.log('content.js============================');

document.body.addEventListener('mousedown', function (event) {
    if (event.button == 2) {
        fanyi(selectText());
    }
}, false);
document.body.addEventListener('dblclick', function (event) {
    fanyi(selectText());
}, false);

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
    }).done(function (data) {
        notif({
            msg: handleFanyirs(data),
            type: "info",
            opacity: 0.5
        });
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });
}

function handleFanyirs(data) {
    if(data.translation && data.translation.length ){
        var str = [];
        var i = 1;
        str[0] = data.translation[0] + ' \n ';

        data.web.forEach(function(item){
            str[i++] = item.key;
            item.value.forEach(function(value){
                str[i++] = value + ','
            });
            str[i++] = '\n';
        });
        return str.join(';');

    }else {
        return 'NOT FOUND';
    }
}


function selectText() {
    if (document.selection) { //For ie
        return document.selection.createRange().text;
    } else {
        console.log('selection is ' + window.getSelection());
        return window.getSelection().toString();
    }
}

