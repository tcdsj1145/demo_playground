var Tween = {
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
}
Math.tween = Tween;
var util = {
    animate: function(ele, style, time, animate) {
        time = time || 432;
        animate = animate || 'Linear';
        var t1 = +new Date;
        var b = parseInt(ele.style['top']) || 0, //开始值
            c = style['top'], //结束值/
            d = Math.floor(time / 17),
            t = 0;

        function run() {
            ele.style['top'] = Tween.Linear(t, b, c- b, d) + 'px';
            t++;
            timer = setTimeout(run, 1000 / 60);
            if (t >= d) {
                clearTimeout(timer);
                console.log(+new Date - t1);
            }
        }
        run();
    }

}