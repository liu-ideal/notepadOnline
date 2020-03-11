const mysql = require('mysql');
function to_collectDelete(res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'collect'
  });
  connection.connect((err)=>{
    if (err) throw err
  });
  let sql="DELETE FROM `collect`";
  connection.query(sql,(err)=>{
    if (err) throw err;
    res.end();
  })
  connection.end();
}
module.exports={
  to_collectDelete
}
