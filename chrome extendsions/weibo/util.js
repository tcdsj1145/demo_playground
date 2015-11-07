function SinaWeiboUtility() {
    /**
    * 62进制字典
    * @property {String}
    */
    this.str62keys = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (typeof (SinaWeiboUtility._initalized) == 'undefined') {
        /**
        * 10进制值转换为62进制
        * @param {String} int10 10进制值
        * @return {String} 62进制值
        */
        SinaWeiboUtility.prototype.int10to62 = function (int10) {
            var s62 = '';
            var r = 0;
            while (int10 != 0) {
                r = int10 % 62;
                s62 = this.str62keys.charAt(r) + s62;
                int10 = Math.floor(int10 / 62);
            }
            return s62;
        };
        /**
        * 62进制值转换为10进制
        * @param {String} str62 62进制值
        * @return {String} 10进制值
        */
        SinaWeiboUtility.prototype.str62to10 = function (str62) {
            var i10 = 0;
            for (var i = 0; i < str62.length; i++) {
                var n = str62.length - i - 1;
                var s = str62.substr(i, 1);  // str62[i]; 字符串用数组方式获取，IE下不支持为“undefined”
                i10 += parseInt(this.str62keys.indexOf(s)) * Math.pow(62, n);
            }
            return i10;
        };
        /**
        * id转换为mid
        * @param {String} id 微博id，如 "201110410216293360"
        * @return {String} 微博mid，如 "wr4mOFqpbO"
        */
        SinaWeiboUtility.prototype.id2mid = function (id) {
            if (typeof (id) != 'string') {
                return false; // id数值较大，必须为字符串！
            }
            var mid = '';

            for (var i = id.length - 7; i > -7; i = i - 7) //从最后往前以7字节为一组读取mid
            {
                var offset1 = i < 0 ? 0 : i;
                var offset2 = i + 7;
                var num = id.substring(offset1, offset2);

                num = this.int10to62(num);
                mid = num + mid;
            }

            return mid;
        };
        /**
        * mid转换为id
        * @param {String} mid 微博mid，如 "wr4mOFqpbO"
        * @return {String} 微博id，如 "201110410216293360"
        */
        SinaWeiboUtility.prototype.mid2id = function (mid) {
            var id = '';

            for (var i = mid.length - 4; i > -4; i = i - 4) //从最后往前以4字节为一组读取mid字符
            {
                var offset1 = i < 0 ? 0 : i;
                var len = i < 0 ? parseInt(mid.length % 4) : 4;
                var str = mid.substr(offset1, len);

                str = this.str62to10(str).toString();
                if (offset1 > 0) //若不是第一组，则不足7位补0
                {
                    while (str.length < 7) {
                        str = '0' + str;
                    }
                }

                id = str + id;
            }
            return id;
        };

        /**
        * 标识对象是否初始化过（将方法挂在prototype上只需执行一次即可，不必要的重复的运算。）
        * @property {boolean}
        */
        SinaWeiboUtility._initalized = true;
    }
}
