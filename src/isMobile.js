module.exports=function isMobile(){
  let isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  return isMobile;
}
