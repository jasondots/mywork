// JavaScript Document

//命名空间 namespace

var hxsd_tools={

//中心显示
showCenter:function (obj){
	obj.show();
	function show(){
		var l=($(window).width()-obj.outerWidth())/2;
		var t=($(window).height()-obj.outerHeight())/2;
		obj.css({"left":l,"top":t});
	};
	show();
	$(window).resize(show);
},

//拖拽
drag:function (obj,title){
	
	title=title || obj;
	
	title.mousedown(function(ev){
		var offset=$(this).offset();
		var disX=ev.pageX-offset.left; //x方向偏移
		var disY=ev.pageY-offset.top; //y方向
		
		
		//鼠标按下  为document绑定move事件-----------------------------
		$(document).bind("mousemove",function(ev){
			var l=ev.pageX-disX;
			var t=ev.pageY-disY;
			
			if(l<0){
				l=0;
			}
			if(t<0){
				t=0;
			};
			
			var s_w=$(window).width();//屏幕宽度
			var s_h=$(window).height();
			if(l>s_w-obj.outerWidth()){
				l=s_w-obj.outerWidth()
			};
			if(t>s_h-obj.outerHeight()){
				t=s_h-obj.outerHeight()
			};
			
			obj.css({"left":l,"top":t});
		});
		
		//鼠标抬起，解绑move事件------------------------------
		$(document).mouseup(function(){
			$(document).unbind('mousemove');
		});
		
		//取消默认事件（阻止圈选文字）--------------------------------
		return false;
	});
},

//读取样式
getStyle:function (obj,styleName){
	return parseInt(getComputedStyle(obj,null)[styleName]);
},


//动画
animate:function (obj,modeJson,speed,fn){//对象 运动模式  速度：时间（秒）  回调函数
	var def_speed={//预定义的速度
		fast:300,
		normal:1000,
		slow:2000
	};
	if(speed){
		if(typeof speed=="string"){
		//if(isNaN(speed)){
			speed=def_speed[speed];
		};
	}else{//没有传入speed
		speed=def_speed.normal;
	};
	//起点
	var start={};//初始值
	var dis={};//距离
	
	for(var key in modeJson){//循环计算初始值
		start[key]=this.getStyle(obj,key);
		dis[key]=modeJson[key]-start[key];
	};
	
	var count=parseInt(speed/30);//时间分段
	var i=0;//计步器
	clearInterval(obj.timer);//开定时器之前，先清除定时器  对象增加了一个自定义属性timer作为定时器id
	obj.timer=setInterval(function(){
		i++;
		var a=1-i/count;
		
		for(var key in modeJson){
			var step_dis=start[key]+dis[key]*(1-a*a*a);
			if(key=="opacity"){//判断是不是透明
				obj.style[key]=step_dis;//运动
			}else{
				obj.style[key]=step_dis+"px";//运动
			};
		};
		if(i==count){
			clearInterval(obj.timer);
			fn && fn();
		}
	},30);
},
}












