var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// 添加测试
suite.add('RegExp#test', function() {
    /o/.test('Hello World!');
})
    .add('String#indexOf', function() {
        'Hello World!'.indexOf('o') > -1;
    })
    .add('String#=', function(){
        var hhh = 'hhh';
    })
    .add('String#+=', function(){
        var hhh = '';
        hhh += 'xx';
    })
// add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
// run async
    .run({ 'async': true });