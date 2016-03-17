var a = ['*', 'd', 'c', '*', 'e', '*', 'a', '*'];

var sort = function(arr) {
        var l =0;
        var r = arr.length-1;
        var tmp = arr[l];
        // while (l < r) {
            while (l < r && arr[r] > tmp) r--;
            if (l < r) {
                arr[l] = arr[r];
                l++;  //l这个坑已经填好了  那么下次从左边数应该从这个坑后面的位置开始 //所以是l++ 而不是 r--
            }
            while (l < r && arr[l] < tmp) l++;
            if (l < r) {
                arr[r] = arr[l];
                r--;
            }
        // }
        arr[l] = tmp;
        console.log(arr)

};

console.log(sort(a));