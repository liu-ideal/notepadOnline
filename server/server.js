const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const server=http.createServer((req,res)=>{

       if(req.method==='POST'){
       res.setHeader('Content-Type', 'text/html; charset=utf-8');
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
         default:{
           res.write('查询地址有误');
           res.end()
         }
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
                 let remoteIp=req.connection.remoteAddress;
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

})
server.listen(80,'0.0.0.0')
