function ftn(){
  var xhr=new XMLHttpRequest();
  var readydata={
    user:'王先生',
    password:'12345'
  };
  var data=JSON.stringify(readydata);
  xhr.open('post','./register.php');
  xhr.setRequestHeader('Content-Type',' application/x-www-form-urlencoded');
  xhr.send('data='+data);
  xhr.onreadystatechange=function(){
       if(xhr.readyState==4&&xhr.status==200){
         if(xhr.responseText.length<6){
           console.log(xhr.responseText);
         }else{
            console.log(JSON.parse(xhr.responseText));
         }

       }
  }
}
var bt=document.querySelector('#bt');
bt.addEventListener('click',ftn,false)
var canvas=document.querySelector('#mycanvas');
var ctx=canvas.getContext('2d');
