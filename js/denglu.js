;(function(){
    "use strict"

    class Login{
        constructor(){
            // 登录注册页面的tab切换
            this.tit1 = document.getElementById("tit1");
            this.tit2 = document.getElementById("tit2");
            this.reg = document.querySelector(".reg");
            this.log = document.querySelector(".login");
            this.addEvent();


            //登录验证
            this.url = "http://www.icodeilife.cn/ctrl/login.php";
            this.user2 = $("#user_2");
            this.pass2 = $("#pass_2");
            this.btn2 = $("#btn-2");

            this.init();

        }
        addEvent(){
            var that = this;
            //点击title
            this.tit1.onclick = function(){
                that.log.style.display = "none";
                that.reg.style.display = "block";

            }
            this.tit2.onclick = function(){
                that.log.style.display = "block";
                that.reg.style.display = "none";
            }
            
        }

        init(){
            var that = this;
            this.btn2.click(function(){
                that.load();
            })
        }
        load(){
            var that= this;
            $.ajax({
                url:this.url,
                data:{
                    user:this.user2.val(),
                    pass:this.pass2.val()
                },
                success:function(res){  
                    switch(res){
                        case "0":
                            alert("用户名密码不符");break;
                        case "1":
                            alert("请重新登陆");break;
                        default:
                            that.res = JSON.parse(res);
                            that.display()
                    }
                }
            })
        }

        display(){

            location.href = "shouye.html";
        }

    }
    
    
    
    
    new Login();

})();





