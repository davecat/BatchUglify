var app=new Vue({el:"#container",data:{idCode:"验证码",time:"60",disabled:!1,vCode:"",clientCode:""},created:function(){this.init()},methods:{init:function(){},setTime:function(){var e,i=this;i.disabled=!0,0===this.time?(i.idCode="验证码",i.time=60,clearTimeout(e),i.disabled=!1):(i.idCode=i.time,i.time--,e=setTimeout(function(){i.setTime()},1e3))},getVerifyCode:function(){var e=this,i=$("#phoneNumber").val(),t=/^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(i);return""===i?(weui.topTips("请输入手机号"),this.disabled=!1,!1):!1===t&&""!==i?(weui.topTips("请输入正确的手机号"),this.disabled=!1,!1):(this.setTime(),void $.ajax({url:"/payserver/product/quickPay/sms/"+i,type:"get",dataType:"json",contentType:"application/json;charset=UTF-8",success:function(i){e.vCode=i},error:function(e){console.log(e)}}))},verifyCode:function(){var e=$("#clientCode").val();this.vCode===e?$("#account_form").submit():weui.topTips("验证码错误")}}});