    var scrollTimer;
    var lastScoll = +new Date;
    $('body').bind('scroll', throttle(function(evt) {
        var now = +new Date;
        if (now - lastScoll > 500) {
            console.log('start');
            $(this).trigger('scrollStart');
        }
        lastScoll = now;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            console.log('end');
            $(window).trigger('scrollEnd');
        }, 300);
    }, 50));



    function throttle(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : +new Date;
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = +new Date;
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }