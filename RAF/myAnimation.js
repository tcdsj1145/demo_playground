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

    //使用raf并不能特别精确的控制整个执行时间
    animate0: function(ele, style, time, animate) {
        time = time || 432;
        animate = animate || 'Linear';
        var t1 = +new Date;
        var b = parseInt(ele.style['top']) || 0, //开始值
            c = style['top'], //结束值/
            d = Math.ceil(time / (1000/60)), //计算次数
            t = 0;

        function run() {
            ele.style['top'] = Tween.Linear(t, b, c- b, d) + 'px';
            t++;
            if (t <= d) {
                requestAnimationFrame(run);
            }else{
                console.log(+new Date - t1);
            }
        }
        run();
    },
    animate: function(ele, style, time, animate) {
        time = time || 432;
        animate = animate || 'Linear';
        var t1 = +new Date;
        var begins = [], ends= [];
        for (key in style) {
            if(key == 'opacity'){
                begins[key] = parseFloat(window.getComputedStyle(ele)[key])
                console.log(begins[key]);
            }else{
                begins[key] = parseInt(window.getComputedStyle(ele)[key]);
            }
        }
        var d = Math.ceil(time / (1000/60)), //计算次数
            t = 0;

        var b = 1, c = 0.1
        function run() {
            for (key in style) {
                if(key == 'opacity'){
                    ele.style[key] = Tween[animate](t, begins[key], style[key]- b, d);
                }else{
                    ele.style[key] = Tween[animate](t, begins[key], style[key]- begins[key], d) + 'px';
                }
            }
            t++;
            if (t <= d) {
                requestAnimationFrame(run);
            }else{
                console.log(+new Date - t1);
            }
        }
        run();
    },
}