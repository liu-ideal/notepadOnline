const http = require('http');
const url = require('url');
const path = require('path');
const server=http.createServer((req,res)=>{
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
       if(req.method==='POST'){

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
       res.write('禁止访问');
       res.end()
     }

})
server.listen(3000)
