var fs = require('fs');
var Q = require('q');
// fs.readFile('story.json', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         try {
//             var obj = JSON.parse(data);
//             obj.prop = 'something new'; //读一个JSON文件并添加了新的属性
//             fs.writeFile('story.json', JSON.stringify(obj), function (error) {
//                 if (err) {
//                     console.log(error);
//                 } else {
//                     console.log('success');
//                 }
//             });
//         } catch (e) {
//             console.log(e);
//         }
//     }
// });


function readFile(url){
    var deferred = Q.defer();
    fs.readFile(url, function(err, data){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
 function writeFile(url, data){
    var deferred = Q.defer();
    fs.writeFile(url, JSON.stringify(data), function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve('success in writeFile');
        }
    });
    return deferred.promise;
 }


var p = readFile('story.json');
p.then(function(data){
    data = JSON.parse(data);
    data.prop = 'newnew';
    console.log(data);
    return writeFile('story.json',data); //写同一个文件会有些问题 导致JSON格式错误
    //原来以为这里有问题
    //实际上没有  是因为上面的读写文件没有用上Promise
    //这里有可能同时的和上面一起读写文件  造成错误
}, function(err){
    console.log(err)
}).then(function(msg){
    console.log(msg);
}, function(err){
    console.log(err);
})

//makeNodeResolver() 是q.js 官方文档上介绍的方法
//defer.makeNodeResolver() rejects the promise if there is an error, and resolves the promise if the function succeeds.

//它不仅仅可以用在readFile中  mongoDB也是可以的
//用在mongoDB  http://jabberwocky.eu/2013/02/15/promises-in-javascript-with-q/

function readFile2(){
    var deferred = Q.defer();
    fs.readFile("story.txt", "utf-8", deferred.makeNodeResolver());
    return deferred.promise;
}
// readFile2().then(function(data){
//     console.log(data);
// },function(err){
//     console.log(err);
// });


