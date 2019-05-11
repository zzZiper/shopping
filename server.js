let http = require("http");

let url = require("url");

let fs = require("fs");

let querystring = require("querystring");

http.createServer((req,res)=>{
    if(req.url != "/favicon.ico"){
        // req.url
        let urlObj = url.parse(req.url);

        switch(urlObj.pathname){
            case "/form":
                ajaxHandle(req,res,urlObj)
                break;
            default:
                readFile(req,res,urlObj.pathname);
        }
    }
}).listen("8666","localhost",()=>{
    console.log("开启成功了")
})
function ajaxHandle(req,res,url){
    let data = {};
    let postData = {};
    // get
    let getData = url.query;
    // post
    let str = "";
    req.on("data",(msg)=>{
        str += msg;
    })
    req.on("end",()=>{
        postData = str;

        // 字符："user=admin&pass=123"
        data = getData || postData;
        
        data = querystring.parse(data);
        
        // 从这一行开始，可以拿到数据，开始处理数据
        var u = data.user;
        var p = data.pass;
        // 假装从数据库得到用户名和密码了
        var mysql = [{
            user:"admin",
            pass:"123"
        },{
            user:"root",
            pass:"123456",
        }]

        var onoff = true;
        mysql.forEach((v,i)=>{
            if(v.user == u && v.pass == p){
                onoff = false
                res.write("0");
            }
        })
        if(onoff == true){
            res.write("1");
        }
        
        res.end();
    })
}

function readFile(req,res,path){
    fs.readFile(".././ziper"+path,(error,data)=>{
        if(error == null){
            res.write(data);
            res.end()
        }
    });
}
