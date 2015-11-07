//Example 2-1. highPrime.js, a brute force prime number calculator that //can be used as a Web Worker.
//
// A simple way to find prime numbers
//
var n = 1;
while (n<1000) {
    n += 1;
    for (var i = 2; i <= Math.sqrt(n); i += 1) {
        if (n % i == 0) {
            continue;
        }
    }
    // found a prime!
    postMessage(n);
}

