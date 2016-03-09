function s(){
  "use strict";

  //即使是strict模式  Function  eval函数还是可以使用的
  var f = new Function('oo', 'console.log(oo)');
  f('xixi');
  var s = eval(3-5);
  console.log(s);
  m = 1;
  console.log(m);
}
s();
