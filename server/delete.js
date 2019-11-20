const mysql = require('mysql');
function toDelete(username,title,res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'liu'
  });
  connection.connect((err)=>{
    if (err) throw err
  });
  let sql="DELETE FROM `"+username+"` WHERE title='"+title+"'";
  connection.query(sql,(err)=>{
    if (err) throw err;
    res.end();
  })
  connection.end();
}
module.exports={
  toDelete
}
