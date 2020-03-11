const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const server=http.createServer((req,res)=>{

       if(req.method==='POST'){
       res.setHeader('Content-Type', 'text/html; charset=utf-8');
       res.setHeader("Access-Control-Allow-Origin","*");
       res.setHeader('Access-Control-Allow-Methods','GET,POST');
       res.setHeader('Access-Control-Allow-Headers','tokenid');
       switch (url.parse(req.url).query) {
         case 'register':{
           const register =require('./register.js');
           let postData='';
           req.on('data',(data)=>{
             postData+=data
           })
           req.on('end',()=>{
             let mydata=JSON.parse(postData);
             register.createUser(mydata.user,mydata.password,res)
           })
         break;
         }
         case 'login':{
           const login =require('./login.js');
           let postData='';
           req.on('data',(data)=>{
             postData+=data
           })
           req.on('end',()=>{
             let mydata=JSON.parse(postData);
             login.toLogin(mydata.user,mydata.password,res)
           })
         break;
         }
         case 'query_all':{
           const query_all =require('./query_all.js');
           let postData='';
           req.on('data',(data)=>{
             postData+=data;
           })
           req.on('end',()=>{
             console.log(postData);
             let mydata=JSON.parse(postData);
             query_all.toQuery_all(mydata.user,res)
           })
         break;
         }
         case 'add':{
           const add =require('./add.js');
           let postData='';
           req.on('data',(data)=>{
             postData+=data
           })
           req.on('end',()=>{
             let mydata=JSON.parse(postData);
             add.toAdd(mydata.user,mydata.title,mydata.content,mydata.time,mydata.img,res)
           })
         break;
         }
         case 'update':{
           const update =require('./update.js');
           let postData='';
           req.on('data',(data)=>{
             postData+=data
           })
           req.on('end',()=>{
             let mydata=JSON.parse(postData);
             update.toUpdate(mydata.user,mydata.title,mydata.content,mydata.time,mydata.oldTitle,res)
           })
         break;
         }
         case 'delete':{
           const godelete =require('./delete.js');
           let postData='';
           req.on('data',(data)=>{
             postData+=data
           })
           req.on('end',()=>{
             let mydata=JSON.parse(postData);
             godelete.toDelete(mydata.user,mydata.title,res)
           })
         break;
         }
         case 'collect':{
           const gocollect =require('./query_collect.js');
             gocollect.toQuery_collect(res);
         break;
         }
         case 'collect_delete':{
           const collectToDelete =require('./collect_delete.js');
             collectToDelete.to_collectDelete(res);
         break;
         }
         case "token":{
           let postData='';
           req.on('data',(data)=>{
             postData+=data
           })
           req.on('end',()=>{
             let mydata=JSON.parse(postData);
             if(req.headers.tokenid){
              jwt.verify(req.headers.tokenid,"home",(err,result)=>{
                if(err){
                  res.end("");
              }else{
                if(result.username===mydata.user){
                  res.end("homeok");
                }else{
                  res.end("");
                }
                }
              })
          }else{
            res.end("");
          }
           })
           break;
         }
         case "kill":{
           let postData='';
           req.on('data',(data)=>{
             postData+=data
           })
           req.on('end',()=>{
             let mydata=JSON.parse(postData);
             if(!mydata.user){res.end(""); return};
             let connection=mysql.createConnection({
               host     : 'localhost',
               user     : 'root',
               password : 'liupeiself519',
               database : 'liu'
             });
             connection.connect((err)=>{
               if (err) throw err
             });
             connection.query("DROP TABLE `"+mydata.user+"`;",(err)=>{
               if(err) throw err;
               res.end("");
             })
             connection.end();
           })

            break;
         }
         default:{
           res.write('查询地址有误');
           res.end()
         }
       }
     }else{
       let urlObj=url.parse(req.url);
       let responseObj=res;
       //console.log(urlObj.pathname);
       function isMusicApi(pathname){
         let rexp=/\/music_api/;
             return rexp.test(pathname);
       }
       function isSongSheet(pathname){
         let rexp=/\/songsheet$/;
         return rexp.test(pathname);
       }
       function isSongSheetList(pathname){
         let rexp=/\/songsheetlist/;
         return rexp.test(pathname);
       }
       function isRecommend(pathname){
         let rexp=/\/recommend/;
         return rexp.test(pathname);
       }
       function isSearch(pathname){
         let rexp=/\/search/;
         return rexp.test(pathname);
       }
       function isTopList(pathname){
         let rexp=/\/toplist/;
         return rexp.test(pathname);
       }
       function isPlayUrl(pathname){
         let rexp=/\/playurl/;
         return rexp.test(pathname);
       }
       function getServerData(protocal,url){
         return new Promise((resolve,reject)=>{
           if(protocal==="http"){
             http.get(url,function(res){
               console.log(res.headers);
               let resultData='';
               res.setEncoding('utf8');
               res.on("data",(data)=>{
                 resultData+=data;
               })
               res.on("end",()=>{
                 console.log(url);

                 resolve(resultData);
               })
             })
           }else{
             https.get(url,function(res){
               let resultData='';
               res.setEncoding('utf8');
               res.on("data",(data)=>{
                 resultData+=data;
               })
               res.on("end",()=>{

                 resolve(resultData);
               })
             })
           }

         })
       };
       if(isMusicApi(urlObj.pathname)){
         console.log("ismusicapi");
           responseObj.writeHead(200, {'Content-Type': 'text/plain'});
           if(isSongSheet(urlObj.pathname)){
             console.log("issongsheet");
             responseObj.end(fs.readFileSync("./songsheet.json"));
             // getServerData("http",`http://m.kugou.com/plist/index&json=true`).then((data)=>{responseObj.end(data)});
           }else if(isSongSheetList(urlObj.pathname)){
             getServerData("http",`http://m.kugou.com/plist/list/${urlObj.query}?json=true`).then((data)=>{responseObj.end(data)});
           }else if(isRecommend(urlObj.pathname)){
             //console.log("recommend");
             getServerData("https",`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-
     8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472`).then((data)=>{responseObj.end(data)});
           }else if(isSearch(urlObj.pathname)){
             //console.log("search",urlObj.query);
             getServerData("https",`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=10&w=${urlObj.query}`).then((data)=>{
               responseObj.end(data)
             });
           }else if(isTopList(urlObj.pathname)){
             //console.log("toplist");
             getServerData("https",`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-
     8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923`).then((data)=>{responseObj.end(data)});
           }else if(isPlayUrl(urlObj.pathname)){
              console.log("playurl");
              console.log(urlObj.query);
              getServerData("https",`https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?
     format=json205361747&platform=yqq&cid=205361747&songmid=${urlObj.query}&filename=C400${urlObj.query}.m4a&guid=126548448`).then((data)=>{responseObj.end(data)});
           }else{
             responseObj.end();
           }
       }else{
         let contentType={
           ".html":"text/html",
           ".jpeg":"image/jpeg",
           ".jpg":"image/jpeg",
           ".png":"image/png",
           ".ico":"image/x-icon",
           ".css":"text/css",
           ".js":"application/x-javascript",
           ".mp3":"audio/mp3",
           ".pdf":"application/pdf"
         };
         let queryUrl=url.parse(req.url).path;
         let rootPath=path.resolve(__dirname,'../','../');
         let filePath=path.join(rootPath,queryUrl);
         if(fs.existsSync(filePath)){
             fs.stat(filePath,(err,stat)=>{
               if (err){console.log(err)}
               if(stat.isDirectory()){
                 res.writeHead(404, { 'Content-Type': 'text/plain'});
                 res.write('404 资源不存在');
                 res.end();
               }else{
                 let fileType=path.extname(filePath);
                 if(fileType==='.html'){
                   let remoteIp=req.connection.remoteAddress+queryUrl;
                   let remoteContent=req.headers["user-agent"];
                   require('./collect.js').toCollect(remoteIp,remoteContent);
                 };
                 if(contentType[fileType]){
                   res.writeHead(200, { 'Content-Type': contentType[fileType] });
               }else{res.writeHead(200, { 'Content-Type': 'text/plain' });}
                 res.write(fs.readFileSync(filePath));
                 res.end();
               }
             });
         }else{
           res.writeHead(404, { 'Content-Type': 'text/plain'});
           res.write('404 资源不存在');
           res.end();
         }
       }

     }

})
server.listen(80,'0.0.0.0')
