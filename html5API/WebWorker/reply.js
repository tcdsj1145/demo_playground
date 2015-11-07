function reply( /* listener name, argument to pass 1, argument to pass 2, etc. etc */ ) {
    if (arguments.length < 1) {
        throw new TypeError("reply - not enough arguments");
        return;
    }
    postMessage({
        "vo42t30": arguments[0],
        "rnb93qh": Array.prototype.slice.call(arguments, 1)
    });
}
