var img='';
function ftn(){
  var xhr=new XMLHttpRequest();
  var extp=/\+/g;
  var imger=img.replace(extp,'%2B')
  var readydata={
    user:'456',
    title:'mynameis liu'
     // content:'实施的奋斗给过你我哦go诶个欧委会',
     // time:'2019-08-02',
     // img:imger
  };
  var data=JSON.stringify(readydata);
  xhr.open('post','./delate.php');
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
bt.addEventListener('click',ftn,false);

function docanvas(clear){
  var canvas=document.querySelector('#canvas');
  var ctx=canvas.getContext('2d');
  ctx.lineWidth=3;
  ctx.strokeStyle='black';
  function doit(event){
    ctx.lineTo(event.clientX,event.clientY);
    ctx.stroke();
  }
  canvas.addEventListener('mousedown',()=>{
    ctx.beginPath();
    canvas.addEventListener('mousemove',doit,false)
  },false)
  canvas.addEventListener('mouseup',()=>{
    ctx.closePath();
    canvas.removeEventListener('mousemove',doit)
  },false)
  var qq=document.querySelector(clear);
  qq.addEventListener('click',()=>{
  img = canvas.toDataURL();
  // var imger=document.createElement('img');
  // imger.src=dataa;
  // document.body.appendChild(imger)


    ctx.clearRect(0,0,300,300)
  },false)
}
docanvas('#qqqq')
