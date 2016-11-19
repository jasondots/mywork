// JavaScript Document

//documentReady
function documentReady(callback){
	if(document.addEventListener)document.addEventListener('DOMContentLoaded', callback, false);
	else{
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete'){
				callback && callback();
			}
		});
	}
};

//getByClass
function getByClass(oParent,cls){
	var arr=[]; //容器
	var aEl=oParent.getElementsByTagName('*');//所有标签
	if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
	else{
		for(var i=0;i<aEl.length;i++){
			//if(aEl[i].className==cls) arr[arr.length]=aEl[i];//向数组中添加
			if(aEl[i].className==cls) arr.push(aEl[i]);//向数组中添加
		}
	return arr;
	}
};

//居中显示弹框
function popShow(elm){
	elm.style.display="block";
	var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
	var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
	elm.style.left=l+'px';
	elm.style.top=t+'px';
};


//拖拽组建
function drag(box,title){//1个参数box，拖拽box, 2个参数，拖拽title
	var handle;
	title? handle=title : handle=box;
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
			document.onmouseup=document.onmousemove=null;
			if(box.releaseCapture)	box.releaseCapture();//取消获捕
		}
		if(box.setCapture)	box.setCapture();//设置捕获
		return false;
	};
};



//读取样式
function getStyle(obj, styleName){
	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
	return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
};

//运动-----------------------------------------------------------------------------
function move(obj,moveJson,stopTime){//对象 终点 运动终点  运动方式
	var prd_speed={ //预定义 predefine
		veryslow:	5000,
		slow:		2000,
		normal:		1000,
		fast:		700,
		veryfast:	300
	};
	
	//如果输入预定速度的字符串，就进行转换
	if(stopTime){
		if(typeof stopTime=='string'){
			stopTime=prd_speed[stopTime];
		};
	}else{
		stopTime=prd_speed.normal;
	}
	
	var start={};//json
	var dis={};//json
	
	for(var key in moveJson){
		start[key]=getStyle(obj, key);
		dis[key]=moveJson[key]-start[key];//距离 distance
	}
	
	//定时器---------------------------------------------
	var count=parseInt(stopTime/30);////次数
	var n=0;//步进

	clearInterval(obj.timer);//开定时器之前，先清除定时器
	
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in moveJson){
			var a=1-n/count;  //a的值会越来越小
			var step_dis=start[key]+dis[key]*(1-a*a*a);
			
			if(key=='opacity'){//透明
				obj.style.filter='alpha(opacity:'+step_dis+')';
				obj.style.opacity=step_dis/100;
			}
			else{//其他
				obj.style[key]=step_dis+'px';
			}
		};
		
		//清除定时器
		if(n==count){
			clearInterval(obj.timer);
		};
	
	},30)
};