const mysql = require('mysql');
function toUpdate(username,title,content,time,oldTitle,res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'liu'
  });
  connection.connect((err)=>{
      if (err) {
        res.write(err);
        res.end();
      }
  });
  let sql="UPDATE `"+username+"` SET `title`='"+title+"', `content`='"+content+"', `time`='"+time+"' WHERE title='"+oldTitle+"';";
  connection.query(sql,(err)=>{
    if (err) {res.write(err);}
    res.end();
  })
  connection.end();
}
module.exports={
  toUpdate
}
