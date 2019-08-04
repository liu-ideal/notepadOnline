function ftn(){
  var xhr=new XMLHttpRequest();
  var readydata={
    user:'李先生',
    password:'liupei1'
  };
  var data=JSON.stringify(readydata);
  xhr.open('post','./register.php');
  xhr.setRequestHeader('Content-Type',' application/x-www-form-urlencoded');
  xhr.send('data='+data);
  xhr.onreadystatechange=function(){
       if(xhr.readyState==4&&xhr.status==200){
         console.log(xhr.responseText);
       }
  }
}
var bt=document.querySelector('#bt');
bt.addEventListener('click',ftn,false)
