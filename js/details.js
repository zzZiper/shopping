;(function(){

    class Magnifier{
        constructor(){
            this.span = document.querySelector(".s_box span");
            this.sBox = document.querySelector(".s_box");
            this.bBox = document.querySelector(".b_box");
            this.bImg = this.bBox.children[0];
            
            //绑定事件
            this.init();

        }

        init(){
            let that = this;
            this.sBox.onmouseover = function(){
                that.show();

                this.onmousemove = function(eve){
                    var e = eve || window.event;
                    that.move({
                        
                        x:e.pageX - this.parentNode.parentNode.parentNode.offsetLeft,
                        y:e.pageY - this.parentNode.parentNode.parentNode.offsetTop
                    });
                }
            }
            this.sBox.onmouseout = function(){
                that.hide();
            }
            
        }
        
        show(){
            this.span.style.display = "block";
            this.bBox.style.display = "block";
        }
        move(pos){
            // console.log(pos.x,pos.y)
            let l = pos.x - this.span.offsetWidth/2;
            let t = pos.y - this.span.offsetHeight/2;
            // console.log(l,t)
            if(l<0) l=0;
            if(t<0) t=0;
            (l>this.sBox.offsetWidth-this.span.offsetWidth) && 
            (l=this.sBox.offsetWidth-this.span.offsetWidth);
            
            (t>this.sBox.offsetHeight-this.span.offsetHeight) && 
            (t=this.sBox.offsetHeight-this.span.offsetHeight);
            // span的移动
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";
            
            // 计算比例
            let x=  l / (this.sBox.offsetWidth-this.span.offsetWidth)
            let y = t / (this.sBox.offsetHeight-this.span.offsetHeight)
            // console.log(x,y)
            
            // 根据比例移动大图
            this.bImg.style.left = -x * (this.bImg.offsetWidth-this.bBox.offsetWidth) + "px";
            this.bImg.style.top = -y * (this.bImg.offsetHeight-this.bBox.offsetHeight) + "px";
        }
        hide(){
            this.span.style.display = "none";
            this.bBox.style.display = "none";

        }

    }
    new Magnifier();



})();

