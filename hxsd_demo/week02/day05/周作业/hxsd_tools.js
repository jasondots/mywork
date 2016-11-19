// JavaScript Document

//居中显示弹框
function popShow(elm){
	elm.style.display="block";
	var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
	var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
	elm.style.left=l+'px';
	elm.style.top=t+'px';
};


//拖拽组建
function drag(box,title){
	//当我传入1个参数box，拖拽box
	//当我传入2个参数，拖拽就在title
	var handle;
	title?handle=title:handle=box;
//----------------------------------------
//点击事件 title
	handle.onmousedown=function(ev){//按下时机  记录下鼠标的错位位置
		var oEv=ev || window.event;
		var disX=oEv.clientX-box.offsetLeft;//left方向
		var disY=oEv.clientY-box.offsetTop;// top 方向
	
		//鼠标移动的对象应该是document
		document.onmousemove=function(ev){//移动拖拽
			var oEv=ev || window.event;
			var l=oEv.clientX-disX;
			var t=oEv.clientY-disY;
			
			//判断屏幕范围
			if(l<0)l=0;
			if(t<0)t=0;
			if(l>document.documentElement.clientWidth-box.offsetWidth)l=document.documentElement.clientWidth-box.offsetWidth;
			if(t>document.documentElement.clientHeight-box.offsetHeight)t=document.documentElement.clientHeight-box.offsetHeight;
			
			//最后赋值
			box.style.left=l+'px';
			box.style.top=t+'px';
		};
		
		//释放鼠标move事件
		document.onmouseup=function(){
			document.onmousemove=null;
			//if(box.releaseCapture)	box.releaseCapture();//取消获捕
		}
		//if(box.setCapture)	box.setCapture();//设置捕获
		return false;
	};

	
	
};