const mysql = require('mysql');
function createUser(username,password,res){
  let connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'liupeiself519',
    database : 'liu'
  });
  connection.connect((err)=>{
    if (err) throw err
  });
  connection.query("SHOW TABLES",(err,results,fields)=>{
    if (err) throw err;
    for(let i=0;i<results.length;i++){
      if(results[i].Tables_in_liu===username){
        res.write("用户名已存在");
        res.end();
        return false
      }
    }
    let connection=mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'liupeiself519',
      database : 'liu'
    });
    connection.connect((err)=>{
      if (err) throw err
    });
    let sql="CREATE TABLE`"+username+"`( `password` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `title` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `content` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,`time` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `img` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL  ) ENGINE = InnoDB;";
    connection.query(sql,(err)=>{
      if (err) throw err;

    });
    let sqltwo="INSERT INTO `"+username+"` (`password`,`title`,`content`,`time`,`img`) VALUES ('"+password+"','this is password','','','');";
    connection.query(sqltwo,(err)=>{
      if (err) throw err;
    })
  connection.end();
  res.end();
  })
  connection.end();
}
module.exports={
  createUser
}
