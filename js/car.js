;(function(){

    class Car{
        constructor(){
            this.tbody = document.querySelector("tbody")
            this.url = "http://localhost:8666/json/list.json"
        
            this.init()
            // 绑定事件
            this.addEvent()
        }
        init(){
            var that = this;
            ajaxGet(this.url).then(function(res){
                // console.log(JSON.parse(res))
                that.res = JSON.parse(res)
                that.getCookie()
            })
        }
        getCookie(){
            this.list = getCookie("list")!="" ? JSON.parse(getCookie("list")) : [];
            
            this.display()
        }
        display(){
            var str = ""
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.list.length;j++){
                    if(this.res[i].listId == this.list[j].id){
                        str += `<tr index="${this.list[j].id}">
                                    <td><input type="checkbox"></td>
                                    <td><img src="${this.res[i].src}"/></td>
                                    <td>${this.res[i].h3}</td>
                                    <td>${this.res[i].span}</td>
                                    <td><input type="number" min=1 value="${this.list[j].num}" class="num"></td>
                                    <td><em class="dele">删除</em></td>
                                </tr>`;
                    }
                }
            }
            this.tbody.innerHTML = str;
        }
        addEvent(){
            var that = this;
            this.tbody.addEventListener("input",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "num"){
                    that.num = target.value;
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.list[i].num = that.num
                    })
                }
            })
            this.tbody.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "dele"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    target.parentNode.parentNode.remove();
                    that.changeCookie(function(i){
                        that.list.splice(i,1)
                    })
                }
            })
        }
        changeCookie(callback){
            for(var i=0;i<this.list.length;i++){
                if(this.list[i].id == this.id){
                    callback(i)
                }
            }
            setCookie("list",JSON.stringify(this.list))
        }
    }
    
    new Car();






})();