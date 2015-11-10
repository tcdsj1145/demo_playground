var require; //两个全局量
var define;
(function() {
  var modules = {},pushStack = {};

  //require的时候才是真的执行模块
  require = function(id, callback) {
    if(Object.prototype.toString.call(id) == '[object Array]'){
      var ids = id, allMods = [];
      ids.forEach(function(id){
        allMods.push(build(modules[id]));
      });
      callback.apply(null, allMods);
    }else{
      if (!modules[id]) {
        throw "module " + id + " not found";
      }
      if (callback) {
        var module = build(modules[id]);
        callback(module);
        return module;
      }else{
        return build(modules[id]);
      }
    }
  };

  //define的时候是把模块存放起来  存到modules[]中
  //define的参数 若是2个 那么是 模块名，模块本身， 若有三个参数 则是 模块名,依赖列表,模块本身
  define = function(id) {
    var deps, factory;
    if (modules[id]) {
      throw "module " + id + " 模块已存在!";
    }
    if(arguments.length > 2){
      deps = arguments[1];
      factory = arguments[2];
      modules[id] = {
        id: id,
        deps: deps,
        factory: factory
      };
    }else{
      factory = arguments[1];
      modules[id] = {
        id: id,
        factory: factory
      };
    }
  }
  function build(module) {
    var  factory = module.factory,
      id = module.id;
    if(pushStack[id]){
      return pushStack[id];
    }
    if(module.deps){
      var deps = [];
      module.deps.forEach(function(id){
        deps.push(build(modules[id]));
      });
      module.exports = factory.apply(module,deps);
    }else{
      module.exports = factory(require, module.exports, module) || {};
    }
    pushStack[id] = module.exports;
    return module.exports; //模块return的结果
  }
})();
