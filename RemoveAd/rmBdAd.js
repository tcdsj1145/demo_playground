window.addEventListener('load', function() {
  console.log('LOADLLOADLPOAODL');
  setInterval(remove,500);
}, false);

function remove() {
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
