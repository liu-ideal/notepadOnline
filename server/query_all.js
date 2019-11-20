const mysql = require('mysql');
function toQuery_all(username,res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'liu'
  });
  connection.connect((err)=>{
    if (err) throw err
  });
  let sql="SELECT `title`,`content`,`time`,`img` FROM `"+username+"`;";
  connection.query(sql,(err,results,fields)=>{
    if (err) throw err;
    let data=JSON.stringify(results);
    res.write(data);
    res.end();
  })
  connection.end();
}
module.exports={
  toQuery_all
}
