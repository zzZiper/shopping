;(function(){

    
    $(".banner").banner({
        items:$(".banner").children(".imgbox").children("a"),  //必选
    
        //可选，左右按钮，不传时默认没有功能
        left:$(".banner").find("#left"),
        right:$(".banner").find("#right"),
    
        // 下标按钮  默认true，false时不生成
        list:false,
        //自动播放，默认true，false时不自动播放
        autoPlay:true,
        // 每张延迟播放的时间，默认2000
        delayTime:3000,
        //每张图片的移动耗时，默认200
        moveTime:1000
    })
    
    // 二维码
    $("#code").children("span").click(function(){
        $("#code").css({display:"none"})
    })

    class List{
        constructor(){
            this.bbox = document.querySelector(".show");
            this.url = "http://localhost:8666/json/hot.json";
            this.init();
            this.addEvent();
        }
        init(){
            var that = this;
            ajaxGet(this.url).then(function(res){
                // console.log(res);
                that.res = JSON.parse(res);
                // console.log(that.res);
                that.display();
            })
        }
        display(){
            let str = "";
            for(var i=0;i<this.res.length;i++){
                str += `<li id="box" index = "${this.res[i].goodsId}">
                        <a href="details.html">
                        <img src="${this.res[i].src}" alt="">
                        <div class="showBox">
                        <h3>${this.res[i].name}</h3>
                        <span>${this.res[i].price}</span>
                        </div>
                        </a>
                    </li>`
            }
            this.bbox.innerHTML = str;
        }
        addEvent(){
            let that = this;
            this.bbox.addEventListener("click",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "add"){
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index");

                    that.setCookie();
                } 
            })
        }
        setCookie(){

            this.goods = getCookie("goods");
            console.log(this.id)
            if(this.goods == ""){
                this.goods = [{
                    id:this.id,
                    num:1
                }];
            }else{
                let onoff = true;
                this.goods = JSON.parse(this.goods);
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id == this.id){
                        this.goods[i].num++;
                        onoff = false;
                        break;
                    }
                }
                if(onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            } 
            setCookie("goods",JSON.stringify(this.goods));
        }


    }
    new List();


    //热销数据
    class List2{
        constructor(){
            this.b_box = document.querySelector(".show_1");
            this.url = "http://localhost:8666/json/about.json";
            this.init();
            this.addEvent();
        }
        init(){
            var that = this;
            ajaxGet(this.url).then(function(res){
                // console.log(res);
                that.res = JSON.parse(res);
                // console.log(that.res);
                that.display();
            })
        }
        display(){
            let str = "";
            for(var i=0;i<this.res.length;i++){
                str += `<li id="box" index = "${this.res[i].goodsId}">
                        <a href="details.html">
                        <img src="${this.res[i].src}" alt="">
                        <div class="showBox">
                        <h3>${this.res[i].name}</h3>
                        <span>${this.res[i].price}</span>
                        </div>
                        </a>
                    </li>`
            }
            this.b_box.innerHTML = str;
        }
        addEvent(){
            let that = this;
            this.b_box.addEventListener("click",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "add"){
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index");

                    that.setCookie();
                } 
            })
        }
        setCookie(){

            this.goods = getCookie("goods");
            console.log(this.id)
            if(this.goods == ""){
                this.goods = [{
                    id:this.id,
                    num:1
                }];
            }else{
                let onoff = true;
                this.goods = JSON.parse(this.goods);
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id == this.id){
                        this.goods[i].num++;
                        onoff = false;
                        break;
                    }
                }
                if(onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            } 
            setCookie("goods",JSON.stringify(this.goods));
        }


    }
    new List2();


})()

































