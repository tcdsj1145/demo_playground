function print(msg) {
    console.log(msg);
}

var sc;
var lines = 0;
while(sc = readline()){
    // sc = 'whli##ilr#e(s#*s)';
    // sc = 'outcha@putchar(*s=#++)';
    // sc = 'returnWA##A!!##C';
    if(!isNaN(sc)){
        lines = +sc;
        print(sc);
        continue;
    }
    var arr = sc.split('');
    var rs = [];
    for (var i = 0; i < arr.length; i++) {
        if(arr[i] == '#'){
            rs.pop();
        }else if(arr[i] == '@'){
            rs = [];
        }else {
            rs.push(arr[i]);
        }
    }
    print(rs.join(''));

}