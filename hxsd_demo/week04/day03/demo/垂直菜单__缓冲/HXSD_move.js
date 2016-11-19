// JavaScript Document

//读取样式
function getStyle(obj, styleName){
	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
	return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
}

//-----------------------------------------------------------------------------
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
	
	//距离=终点-起点;
	//var start=getStyle(obj, moveMode);//起点数值
	//var dis=end-start;//距离 distance
	
	
	var start={};//json
	var dis={};//json
	
	for(var key in moveJson){
		start[key]=getStyle(obj, key);
		dis[key]=moveJson[key]-start[key];//距离 distance
	}
	
	//定时器---------------------------------------------
	var count=parseInt(stopTime/30);////次数
	var n=0;//步进

	clearInterval(obj.timer);//使用对象属性，定义计时器变量
	
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
		
		//取消定时器
		if(n==count){
			clearInterval(obj.timer);
		};
	
	},30)
};