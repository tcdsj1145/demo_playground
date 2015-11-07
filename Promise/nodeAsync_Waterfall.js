var fs = require('fs');
var async = require('async');
function readFile(readFileCallback) {
    fs.readFile('story.json', function(error, file) {
        console.log('in readFile');
        if (error) {
            readFileCallback(error);
        } else {
            //这里的第二个之后参数是给下一个waterfall中的函数使用的
            readFileCallback(null, file);
        }
    });
}

function processFile(file, processFileCallback) {
    var stocksJson = JSON.parse(file);
    if (stocksJson != null) {
        //...
        processFileCallback(null, 'done');
    } else {
        console.log(" doesn't exist on the json");
        processFileCallback(null);
    }
}

async.waterfall([
    readFile,
    processFile
], function(error, rs) {
    if (error) {
        //handle readFile error or processFile error here
    } else {
        console.log(rs);
    }
});

//官网的例子
// async.waterfall([
//     function(callback) {
//         callback(null, 'one', 'two');
//     },
//     function(arg1, arg2, callback) {
//       // arg1 now equals 'one' and arg2 now equals 'two'
//         callback(null, 'three');
//     },
//     function(arg1, callback) {
//         // arg1 now equals 'three'
//         callback(null, 'done');
//     }
// ], function (err, result) {
//     // result now equals 'done'
// });
