var out
function print(msg) {
    out.push(msg);
    console.log(msg);
}



var value = {
    A: 30,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    0: 10,
    J: 11,
    Q: 12,
    K: 13
}

function compare(card1, card2){
    var sum1=0, sum2 =0;
    card1.forEach(function(i){
        sum1 += value[i];
    });
    card2.forEach(function(i){
        sum2 += value[i];
    })
    if(sum1 >sum2){
        print(1);
    }else if(sum1 == sum2){
        print(0);
    }else if(sum1 < sum2){
        print(-1);
    }
}

function same3(card1) {
    if (card1[0] == card1[1] && card1[1] == card1[2]) return true;
}

function shunzi(card1) {
    if (value[card1[0]] + 1 == value[card1[1]] && value[card1[1]] + 1 == value[card1[2]]) {
        return true;
    }
}

function dui(card){
    if(value[card[0]] == value[card[1]]   ||  value[card[1]] == value[card[2]]  ||  value[card[0]] == value[card[2]]){
        return true;
    }
}

var sc;

while(sc = readline()){
// sc = "132 354";
// sc = 'KKK QQQ';
// sc = "10102 K77";
sc.replace(/10/gi,'0');
player1 = player2 = 0;
var arr = sc.split(' ');
var n = arr[0].toUpperCase();
var m = arr[1].toUpperCase();
var card1 = n.split('');
var card2 = m.split('');
var sum1 = sum2 =0;
if (same3(card1) && same3(card2)) {
    if (value[card1[0]] > value[card2[1]]) {
        print(1);
    } else {
        print(-1);
    }
} else if (dui(card1) && dui(card2)) {
    compare(card1,card2);
} else if (shunzi(card1) && shunzi(card2)) {
    compare(card1,card2);
} else if(   (same3(card1) && !same3(card2))  ||    (!same3(card1) && same3(card2))   ){
    if(same3(card1)){
        print(1);
    }else{
        print(-1);
    }
} else if(  (shunzi(card1) && !shunzi(card2))    ||   (shunzi(card2) && !shunzi(card1))         ){
    if(shunzi(card1)){
        print(1);
    }else{
        print(-1);
    }
}else if(   (dui(card1) &&  !dui(card2)  ) ||  ( dui(card2)&& !dui(card1)  )    ){
    if(dui(card1)){
        print(1);
    }else{
        print(-1);
    }
}else {
    compare(card1,card2);
}

}
