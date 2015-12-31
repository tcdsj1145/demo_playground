var Promise = require("bluebird");
var fs = require('fs');


fs.readFileAsync = function(filename){
  return new Promise(function(resolve,reject){
    fs.readFile(filename,function(data){
      resolve(data);
    })
  });
}

var fileNames = ['story.txt','story.json','story2.json'];
var promises = [];
for (var i = 0; i < fileNames.length; ++i) {
    promises.push(fs.readFileAsync(fileNames[i]));
}
Promise.all(promises).then(function() {
    console.log("done");
});

// Using Promise.map:
Promise.map(fileNames, function(fileName) {
    // Promise.map awaits for returned promises as well.
    return fs.readFileAsync(fileName);
}).then(function() {
    console.log("map done");
});

var m1 = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve('oo');
  },100);
});
var m2 = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve('oo');
  },1500);
});
var pros = {
  m1:m1,
  m2:m2
}
Promise.map(['m1','m2'], function(keyname){
  return pros[keyname];
}).then(function(){
  console.log('map setTimeout all done');
});
