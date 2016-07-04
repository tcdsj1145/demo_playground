//看看一般Promise的用法
// promise = new Promise(function(resolve, reject) {
//   //...
//     resolve(1);
//   //...
// })
// .then(function(val){}, functioin(err){})
// .then(function(val){}, functioin(err){})


//Promise对象接收一个函数  该函数有两个参数
function Promise(resolver) {
  var queue = []; //链式调用数组
  resolver(resolve, reject);

  //state 0 是resolve
  function next(state, val) {
    var arr;
    var chainRs;
    //一个Promise后面又可以有多个then
    //为了使resolve晚于 then 执行  暂时用一个setTimeout

    setTimeout(function() {
      if (arr = queue.shift()) {
        chainRs = arr[state](val);
        if(!chainRs) return;
        //某一个resolve函数返回的又是一个Promise对象
        if (chainRs && typeof chainRs.then == 'function') {
          chainRs.then(resolve, reject);
        } else {
          //resolve函数返回一个普通的值
          resolve(chainRs) //.then(resolve, reject);
        }
      }
    }, 0);
  }

  function resolve(x) {
    next(0, x);
  }

  function reject(reason) {
    next(1, reason);
  }
  //Promise最明显的特征 是可以then  then接收两个参数
  //then就是将传入的函数放入队列中
  this.then = function(resolve, reject) {
    queue.push([resolve, reject]); //resovle  reject  这两个参数也都是函数
    return this;
  }
}
Promise.resolve = Promise.cast = function(x) {
  return new Promise(function(resolve) {
    resolve(x);
  })
}

Promise.all = function(promises){
  var len = promises.length;
  var results = [];
  return new Promise(function(resolve){
    promises.forEach(function(p, i){
      p.then(function(data){
          results[i] = data;
          len--;
          if(len == 0){
            resolve(results);
          }
      }, function(err){
        console.log(err);
      });
    });
  });
}


var p = new Promise(function(resolve) {
    setTimeout(function() {
      resolve('ok')
    }, 1200);
  }).then(function(data) {
    console.log(data);
    // return 555;
    return new Promise(function(resolve){
      setTimeout(function(){
        resolve('wahaha');
      }, 2200);
    })
  })
  .then(function(data) {
    console.log('2nd then', data);
    // return 666;
  })
  .then(function(data) {
    console.log('3rd then', data);
  });


// Promise.resolve(999)
// .then(function(data){
//   console.log(data);
//   return new Promise(function(resolve, reject){
//     // resolve('xixi');
//     reject('xixi');
//   })
// }).then(function(data){
//   console.log(data);
// },function(err){
//   console.log(err);
// })

// Promise.all([
// new Promise(function(resolve){
//   setTimeout(function(){
//     resolve(111);
//   }, 1000);

// }),
// new Promise(function(resolve){
//   resolve(222);
// })

// ]).then(function(results){
//   console.log(results);
// })