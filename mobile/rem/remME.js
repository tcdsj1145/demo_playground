(function(){
    var doc = window.document;
var docEl = doc.documentElement;
var metaEl = doc.querySelector('meta[name="viewport"]');
var flexibleEl = doc.querySelector('meta[name="flexible"]');
var dpr = 0;
var scale = 0;
var tid;

if (metaEl) {
    console.warn('将根据已有的meta标签来设置缩放比例');
}else{
    scale = 1 / window.devicePixelRatio;
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = doc.createElement('div');
        wrap.appendChild(metaEl);
        doc.write(wrap.innerHTML);
    }
}
setRootFont();

})();

window.addEventListener('orientationchange', function() {
    setRootFont();
}, false);


function setRootFont() {
    var clientWidth = document.documentElement.clientWidth;
    var fontSize = (clientWidth / 20).toFixed(2);
    document.documentElement.style.fontSize = fontSize + 'px';
}
