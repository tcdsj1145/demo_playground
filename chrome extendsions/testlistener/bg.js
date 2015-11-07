
window.onload = function() {
    console.log('bg has loaded');

    mountMsgListener();
    mountRemoveListener();
}




function mountMsgListener() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        sendResponse({farewell:'bg11'});
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        sendResponse({farewell:'bg12'});
    });

}

