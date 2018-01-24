/**
 * Created by dave on 17/11/30.
 */
var app = new Vue({
    el: '#container',
    data:{
        idCode: '验证码',
        time: '10'
    },
    created:function () {
        this.init()
    },
    methods:{
        init: function () {
            console.log("加载vue");
        },
        setTime:function() {
            var that = this;
            var a;
            if (this.time === 0) {
                that.idCode = "验证码";
                that.time = 10;
                clearTimeout(a);
            } else {
                that.idCode = that.time;
                that.time--;
                a = setTimeout(function() {
                    that.setTime()
                },1000);
            }
        }

    }
});