// window.addEventListener('DOMContentLoaded', function() {
//   console.log('dom content load');

// }, false);
function myStyle() {
  var sheet = document.createElement('style');
  sheet.id = 'myStyle';
  sheet.innerHTML = "body{background:rgba(242, 242, 242, 0.81)!important;} em{color: #FF4A4A!important;font-size:large!important;} a{color:#333!important;}";
  document.head.appendChild(sheet);
  console.log('dom content load----');
}

var adInterval = setInterval(removeAD, 250);
function removeAD() {
  console.log('remove AD');
  var divs = document.querySelectorAll('#content_left>div');
  if(!divs.length){
    divsArr = Array.prototype.slice.call(divs, 0);
    for (var i = divs.length - 1; i >= 0; i--) {
      var ele = divs[i];
      if (ele.className.indexOf('c-container') == -1) {
        // ele.style.cssText = 'background:red';
        ele.remove();
        console.log('moved');
      }
    }
  }else{
    clearInterval(adInterval);
  }
}
var styleInterval = setInterval(function() {
  if (!document.querySelector('#myStyle')) {
    myStyle();
  } else {
    clearInterval(styleInterval);
  }
}, 250);
