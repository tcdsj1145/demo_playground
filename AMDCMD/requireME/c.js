define('c', function(require, exports, module) {
    var a = require('a');
    var b = require('b');
    return {
      name: 'c' + a.name + b.name
    }
});

