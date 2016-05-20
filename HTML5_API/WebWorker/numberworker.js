/**
 * This worker is used to calculate
 * the least common multiple
 * and the greatest common divisor
 */
/*消息监听*/
/*由于本身就是一个worker  这里就省去了 xx.onmessage*/
onmessage = function (event) {
    var first = event.data.first;
    var second = event.data.second;
    calculate(first, second);
};



/*
 * calculate the least common multiple
 * and the greatest common divisor
 */
function calculate(first, second) {
    //do the calculation work
    var common_divisor = divisor(first, second);
    var common_multiple = multiple(first, second);
    postMessage("Work done! " +
        "The least common multiple is " + common_divisor + " and the greatest common divisor is " + common_multiple);
}



/**
 * calculate the greatest common divisor
 * @param number
 * @param number
 * @return
 */
function divisor(a, b) {
    if (a % b == 0) {
        return b;
    } else {
        return divisor(b, a % b);
    }
}

/**
 * calculate the least common multiple
 * @param number
 * @param number
 * @return
 */
function multiple(a, b) {
    var multiple = 0;
    multiple = a * b / divisor(a, b);
    return multiple;
}

