// window.onload = function() {
    console.log('word.js============================');
    rightClickListener();
    // mountGetMsg();

// }

function rightClickListener() {
    document.body.addEventListener('mousedown',function(event) {
        if(event.button == 2){
            chrome.runtime.sendMessage(selectText(), function(response) {
            });
        }
    },false);
    document.body.addEventListener('dblclick',function(event){
        chrome.runtime.sendMessage(selectText(),function(response){
        });
    },false);
    // $(document).mousedown(function(e) {
    //     if (e.button == 2) {
    //         chrome.runtime.sendMessage(selectText(), function(response) {});
    //         return false;
    //     }
    //     return true;
    // });
    // $(document).dblclick(function(e){
    //     chrome.runtime.sendMessage(selectText(), function(response) {});
    // });

}



function mountGetMsg() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log('content get msg ==============');
        console.log(message);
    });
}


function selectText() {
    if (document.selection) { //For ie
        return document.selection.createRange().text;
    } else {
        console.log('selection is '+window.getSelection());
        return window.getSelection().toString();
    }
}