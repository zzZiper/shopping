;(function(){
 
    class List{
        constructor(){
            this.bbox = document.querySelector(".show");
            this.url = "http://localhost:8666/json/list.json";
            this.init();
            this.addEvent();
        }
        init(){
            var that = this;
            ajaxGet(this.url).then(function(res){
                // console.log(res);
                that.res = JSON.parse(res);
                console.log(that.res[4].listId);
                that.display();
                
            })
        }
        display(){
            let str = "";
            for(var i=0;i<this.res.length;i++){
                str += `<li id="box" index = "${this.res[i].listId}">
                                
                            <a href="details.html">
                                <img src="${this.res[i].src}" alt="">
                                <div class="showBox">
                                <h3>${this.res[i].h3}</h3>
                                </div>
                            </a>
                            <span>${this.res[i].span}<em class="add">加入购物车</em></span>
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
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.setCookie();
                } 
                // alert("加入购物车成功")
            })
        }
        setCookie(){

            this.list = getCookie("list");
            console.log(this.id)
            if(this.list == ""){
                this.list = [{
                    id:this.id,
                    num:1
                }];
            }else{
                let onoff = true;
                this.list = JSON.parse(this.list);
                for(var i=0;i<this.list.length;i++){
                    if(this.list[i].id == this.id){
                        this.list[i].num++;
                        onoff = false;
                        break;
                    }
                }
                if(onoff){
                    this.list.push({
                        id:this.id,
                        num:1
                    })
                }
            } 
            setCookie("list",JSON.stringify(this.list));
        }


    }
    new List();


})()

































