// JavaScript Document

//读取样式
function getStyle(obj, styleName){
	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
	return parseInt(value);
}

//-----------------------------------------------------------------------------
function move(obj,moveJson,fn,speed){//对象 json 速度（时间） 回调
	var def_speed={ //default
		veryslow:	3000,
		slow:		2000,
		normal:		1000,
		fast:		700,
		veryfast:	300
	};
	
	//如果输入预定速度的字符串，就进行转换
	if(speed){
		if(typeof speed=='string'){
			speed=def_speed[speed];
		};
	}else{
		speed=def_speed.normal;
	}
	
	//-----------------------------------------------------
	var start={};//json
	var dis={};//json
	
	for(var key in moveJson){
		start[key]=getStyle(obj, key);
		dis[key]=moveJson[key]-start[key];//距离 distance
	}
	
	//分段
	var count=parseInt(speed/10);////次数
	var n=0;//步进
	
	//定时器---------------------------------------------
	clearInterval(obj.timer);//使用对象属性，定义计时器变量
	
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in moveJson){
			var a=1-n/count;  //a的值会越来越小
			var step_dis=start[key]+dis[key]*(1-a*a*a);
			
			if(key=='opacity'){//透明
				obj.style.filter='alpha(opacity:'+step_dis*100+')';
				obj.style.opacity=step_dis;
			}
			else{//其他
				obj.style[key]=step_dis+'px';
			}
		};
		
		//取消定时器
		if(n==count){
			clearInterval(obj.timer);
			fn && fn();
		};
	
	},10)
};