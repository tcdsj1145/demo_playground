chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log('bg2 get message');
  sendResponse('BG GOT message');
});
