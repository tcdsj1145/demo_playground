window.onload = function() {


  var btnCss = document.getElementById('applyCss');
  btnCss.addEventListener('click', function() {
    // document.querySelector('#resultsRequest').innerHTML += 'running';
    //传消息到content?  yes============================================
    var csstext = document.querySelector('.csstext').value;
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      var tab = tabs[0];
      console.log(tab);
      chrome.tabs.insertCSS(tab.id,{'code':csstext},function(){
        document.querySelector('#applyCssMsg').innerHTML = response;
      });
    });

  }, false);


  var btnTOBG = document.querySelector('#popToBG');
  btnTOBG.addEventListener('click', function() {
    // 传消息到background //ok
    chrome.runtime.sendMessage('toN', function(response) {
      document.querySelector('#popToBG_msg').innerHTML += response;
    });
  }, false);

  var btnTOBGPort = document.querySelector('#popToBGPort');
  btnTOBGPort.addEventListener('click', function() {
    var port = chrome.runtime.connect({
      name: "knockknock"
    });
    port.postMessage({
      joke: "Knock knock"
    });
    //这里的回调需要再写一个监听
    port.onMessage.addListener(function(msg) {
      if (msg.question == "Who's there?")
        port.postMessage({
          answer: "Madame"
        });
      else if (msg.question == "Madame who?")
        port.postMessage({
          answer: "Madame... Bovary"
        });
    });
  }, false);

  var btnToContentPort = document.querySelector('#popToContentPort');
  btnToContentPort.addEventListener('click', function() {

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      var tab = tabs[0];
      console.log(tab);
      var port = chrome.tabs.connect(tab.id,{
        name: "knockknock"
      });
      console.log('port'+port);
      port.postMessage({
        joke: "Knock knock"
      });
      //这里的回调需要再写一个监听
      port.onMessage.addListener(function(msg) {
        document.querySelector('#popToContentPortMsg').innerHTML = msg;
      });

    });
  }, false);

}


function changeTextById(elementId, text) {
  document.getElementById(elementId).innerText = text;
}