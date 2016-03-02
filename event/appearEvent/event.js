doc = document;

(function() {
  //实际上所有事件函数都存放在cacheData中
  //cacheData是一个对象  结构为
  //{1: {click:[fn,fn], mouseover:[fn,fn] }.....}
  //1代表 data234235325325属性值 为1 的元素  这个属性名这个怪异就是为了防止重复
  var cacheData = {};
  var now = +(new Date());
  var attribute = 'data' + now;
  var counter = 1;
  this.getData = function(elem) {
    if (!elem[attribute]) {
      elem[attribute] = counter;
      cacheData[counter] = {};
      return cacheData[counter++];
    } else {
      return cacheData[elem[attribute]];
    }
  }
})();
(function() {
  var handlers = {};
  this.addEvent = function(elem, type, fn) {
    var handlerObj = getData(elem);
    handlerObj[type] ? handlerObj[type].push(fn) : handlerObj[type] = [fn];

    if (!handlerObj.dispatcher) {

      //包装了事件处理函数
      handlerObj.dispatcher = function(event) {
        // console.log('dispatcher');
        var handlers = handlerObj[type];
        for (var i = handlers.length - 1; i >= 0; i--) {
          var fn = handlers[i];
          fn.call(elem, event);
        };
      }
    }
    //表示该元素第一次添加该类型的事件
    if (handlerObj[type].length == 1) {
      elem.addEventListener(type, handlerObj.dispatcher, false);
    }

  }
  this.fireEvent = function(elem, event) {
      var handlerObj = getData(elem);
      var parent = elem.parentElement;
      if (typeof event == 'string') {
          event = {
              type: event,
              target: elem
          }
      }
      //如果该元素绑定了事件 就调用dispatcher
      if (handlerObj.dispatcher) {
          handlerObj.dispatcher.call(elem, event);
      }
      //因为存在事件代理 所以可能出现子元素触发事件
      //但是子元素本身没有绑定事件 而是子元素的父元素有事件处理
      if(parent){
          arguments.callee(parent, event);
      }
  }

  this.removeEvent = function(elem, type) {
    var handlerObj = getData(elem);
    handlerObj[type] = [];
    elem.removeEventListener(type, handlerObj.dispatcher, false);
  }
})();
