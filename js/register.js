;(function(){
    "use strict"

    class Login{
        constructor(){
            
            // 注册验证
            this.url = "http://www.icodeilife.cn/ctrl/register.php";
            this.btn = $("#btn");
            this.user = $("#user");
            this.pass = $("#pass");
            this.tel = $("#tel");
            this.email = $("#email");

            this.judeg();

        }
        
        //正则验证注册信息
        judeg(){
            let reg = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/;
            
            this.init();
        }
        

        init(){
            var that = this;
            this.btn.click(function(){
                that.load();
            })
        }
        load(){
            var that = this;
            $.ajax({
                url:this.url,
                data:{
                    tel:this.user.val(),
                    pass:this.pass.val(),
                    email:this.email.val()
                },
                success:function(res){
                    switch(res){
                        case "0":
                            alert("你的名字已经被别人占用啦，再换一个吧！");break;
                        case "1":
                            alert("注册成功啦，点击确定3秒后自动跳转到登录");
                            setTimeout(() => {
                                location.href = "shouye.html";
                            }, 3000);
                            break;
                        case "2":
                            alert("你还有信息没有填写");break;
                    }
                }
            })
        }
    }
    
    
    
    
    new Login();

    

})();