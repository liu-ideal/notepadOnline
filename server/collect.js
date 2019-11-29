const mysql = require('mysql');
function toCollect(ip,content){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'collect'
  });
  connection.connect((err)=>{
    if (err) throw err
  });
  let sql="INSERT INTO `collect` (`ip`,`content`) VALUES ('"+ip+"','"+content+"');";
  connection.query(sql,(err)=>{
    if (err) throw err;
  })
  connection.end();
}
module.exports={
  toCollect
}
