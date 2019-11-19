const http = require('http');
const url = require('url');
const server=http.createServer((req,res)=>{
console.log(url.parse(req.url).query)
if(url.parse(req.url).query==="register"){
  const register =require('../notepadOnline/server/register.js');
  let postData='';
  req.on('data',(data)=>{
    postData+=data
  })
  req.on('end',()=>{
    let mydata=JSON.parse(postData);
    register.createUser(mydata.user,mydata.password,res)
  })
}else if(url.parse(req.url).query==="login"){
  const login =require('../notepadOnline/server/login.js');
  let postData='';
  req.on('data',(data)=>{
    postData+=data
  })
  req.on('end',()=>{
    let mydata=JSON.parse(postData);
    login.toLogin(mydata.user,mydata.password,res)
  })
}


})
server.listen(3000)
