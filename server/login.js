const mysql = require('mysql');
function toLogin(username,password,res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'liu'
  });
  let tableName='';
  connection.connect((err)=>{
    if (err) throw err
  });
  connection.query("SHOW TABLES",(err,results,fields)=>{
    for(let i=0;i<results.length;i++){
      if(results[i].Tables_in_liu===username){
         tableName=username
      }
    }
    if(tableName){
      let connection=mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'liupeiself519',
        database : 'liu'
      });
      let sqlQuery="SELECT * FROM `"+tableName+"` LIMIT 1 ;";
      connection.query(sqlQuery,(err,results,fields)=>{
        if (err) throw err;
        if(results[0].password===password){
          res.end();
          return
        }
        res.write("用户名或密码不正确")
        res.end()
      })
      connection.end();
    }else{
      res.write("用户名或密码不正确")
      res.end()
    }
  })
  connection.end();
}
module.exports = {toLogin};
