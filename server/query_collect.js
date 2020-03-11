const mysql = require('mysql');
function toQuery_collect(res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'collect'
  });
  connection.connect((err)=>{
    if (err) throw err
  });
  let sql="SELECT `ip`,`content` FROM `collect`;";
  connection.query(sql,(err,results,fields)=>{
    if (err) throw err;
    let data=JSON.stringify(results);
    res.write(data);
    res.end();
  })
  connection.end();
}
module.exports={
  toQuery_collect
}
