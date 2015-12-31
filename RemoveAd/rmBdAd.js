myStyle();
window.addEventListener('load', function() {
  myStyle();
  setInterval(removeAD,500);
}, false);

function myStyle(){
  var sheet = document.createElement('style');
  sheet.innerHTML = ".result a {color:#333 !important;}";
  document.body.appendChild(sheet);
}

function removeAD() {
  var divs = document.querySelectorAll('#content_left>div');
  divsArr = Array.prototype.slice.call(divs, 0);
  for (var i = divs.length - 1; i >= 0; i--) {
    var ele = divs[i];
    if (ele.className.indexOf('c-container') == -1) {
      ele.remove();
      ele.style.cssText = 'background:red';
      console.log('moved');
    }
  };
}
