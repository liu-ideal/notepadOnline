var docanvas={
   writeCanvas:function(clear){
    var canvas=document.querySelector('#canvas');
    var ctx=canvas.getContext('2d');
    var srcData='';
    ctx.lineWidth=3;
    ctx.strokeStyle='black';
    function doit(event){
      var spareSpaceY=canvas.getBoundingClientRect().top;//这里获取的是当前元素的顶部距窗口顶部的距离
      var spareSpaceX=canvas.getBoundingClientRect().left;//同理
      ctx.lineTo(event.clientX-spareSpaceX,event.clientY-spareSpaceY+10);//调整笔的热点与鼠标不一致加10个像素
      ctx.stroke();
    }
    canvas.addEventListener('mousedown',()=>{
      ctx.beginPath();
      canvas.addEventListener('mousemove',doit,false)
    },false)
    canvas.addEventListener('mouseup',()=>{
      ctx.closePath();
      docanvas.srcData=canvas.toDataURL();
      canvas.removeEventListener('mousemove',doit)
    },false)
    var qq=document.querySelector(clear);
    qq.addEventListener('click',()=>{
      var mywidth =canvas.offsetWidth;
      var myheight=canvas.offsetHeight;
      ctx.clearRect(0,0,mywidth,myheight)
    },false)
  },
  srcData:null
}

export default docanvas
