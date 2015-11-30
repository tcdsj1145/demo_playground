var Flow = function() {
  var self, stack = [],
    //等待所有同步操作完成后开始执行异步的部分
    timerId = setTimeout(function() {
      timerId = null;
      self._next();
    }, 0);
  return self = {
    destroy: function() {
      timerId && clearTimeout(timerId);
    },

    //seq 和par 都只是挂载了函数(把函数保存在了stacks中)  并没有执行
    //同步执行的任务都在一个元素中
    //比如 stack = [  [f1()], [f2(), f3()], [f4()]   ]
    //表示 f1()   f2()f3()      f4()   三个顺序执行的任务   其中任务2  f2f3两个函数是并行执行
    par: function(callback, isSeq) {
      if (isSeq || !(stack[stack.length - 1] instanceof Array)) {
        stack.push([]);
      }
      stack[stack.length - 1].push(callback);
      return self; //链式调用
    },
    seq: function(callback) {
      return self.par(callback, true);
    },

    //调用一次_next  解决一次顺序任务
    _next: function(err, result) {
      var errors = [],
        results = [],
        callbacks = stack.shift() || [], //callbacks [function(next){....}]  //当一个空数组shift时  得到的是undefined
        nbReturn = callbacks.length,
        isSeq = nbReturn == 1; //表明是顺序任务  比如上面 [f1()] 这种情况
      for (var i = 0; i < callbacks.length; i++) {
        (function(fct, index) {
          //fct就是异步函数 fct接受三个参数 fct(next, err, result)
          //而这个function(err, result) 就是next
          //next接受两个参数  next('error', 'retValue');
          fct(function(error, result) {
            errors[index] = error;
            results[index] = result;

            if (--nbReturn == 0) { //表明此次顺序任务执行完毕  比如上面[f2,f3] 到f3的时候
              //调用下一个任务
              self._next(isSeq ? errors[0] : errors, isSeq ? results[0] : results)
            }
          }, err, result);
        })(callbacks[i], i);
      }
    }
  }
};

// export in common js
if (typeof module !== "undefined" && ('exports' in module)) {
  module.exports = Flow;
}

// Asynchronous Module Definition - http://requirejs.org/docs/whyamd.html
if (typeof define === 'function' && define.amd) {
  define('Flow', [], function() {
    return Flow;
  });
}
