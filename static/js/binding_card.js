/**
 * Created by dave on 17/11/30.
 */
var app = new Vue({
    el: '#container',
    data: {
        idCode: '验证码',
        time: '60',
        disabled: false,
        vCode: '',
        clientCode: ''
    },
    created: function () {
        this.init()
    },
    methods: {
        init: function () {

        },
        setTime: function () {
            var that = this;
            that.disabled = true;
            var a;
            if (this.time === 0) {
                that.idCode = "验证码";
                that.time = 60;
                clearTimeout(a);
                that.disabled = false;
            } else {
                that.idCode = that.time;
                that.time--;
                a = setTimeout(function () {
                    that.setTime()
                }, 1000);
            }
        },

        getVerifyCode: function () {
            var that = this;

            var p = $('#phoneNumber').val();
            var valid_tel = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(p);
            if (p === '') {
                weui.topTips("请输入手机号");
                this.disabled = false;
                return false;
            }

            if (valid_tel === false && (p !== '')) {
                weui.topTips("请输入正确的手机号");
                this.disabled = false;
                return false;
            }
            this.setTime();
            $.ajax({
                url: "/payserver/product/quickPay/sms/" + p,
                type: "get",
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (rs) {
                    that.vCode = rs;
                },
                error: function (xhr) {
                    console.log(xhr);
                }
            });
        },

        verifyCode: function () {
            var clientCode = $('#clientCode').val();
            if (this.vCode === clientCode) {
                $("#account_form").submit();
            } else {
                weui.topTips('验证码错误');
            }
        }
    }
});
