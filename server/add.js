const mysql = require('mysql');
function toAdd(username,title,content,time,img,res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'liu'
  });
  connection.connect((err)=>{
    if (err) throw err
  });
  let sql="INSERT INTO `"+username+"` (`password`,`title`,`content`,`time`,`img`) VALUES ('','"+title+"','"+content+"','"+time+"','"+img+"');";
  connection.query(sql,(err)=>{
    if (err) throw err;
    res.end();
  })
  connection.end();
}
module.exports={
  toAdd
}
