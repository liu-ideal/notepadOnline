const mysql = require('mysql');
const connection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"liupeiself519",
  database:"test"
});
connection.connect();
// let sql="CREATE TABLE `test`( `password` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `title` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `content` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,`time` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `img` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL  ) ENGINE = InnoDB;";//创建表
// let sql="INSERT INTO `test` (`password`,`title`,`content`,`time`,`img`) VALUES ('','1','liu','nihao','gffffffffi');";//增
// let sql="DELETE FROM `test` WHERE title=1;";//删
 // let sql="UPDATE `test` SET `title`='1233333', `content`='122222223', `time`='125656463' WHERE title='456';";//改
  // let sql="SELECT `title`,`content`,`time`,`img` FROM `test`";//查
connection.query(sql,(err,results,field)=>{
  if (err) throw err;
  console.log(results)
})
connection.end();
