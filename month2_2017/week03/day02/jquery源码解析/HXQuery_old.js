
(function (window){//传入window顶级对象

	function HXQuery(arg){
		this.elements=[];	//存元素
		
		switch(typeof arg){
			case 'function'://如果传入的是一个函数，调用domReady函数（类似jQuery的document.ready）
				domReady(arg);
				break;
			case 'string':
				if(arg.indexOf('<')!=-1){//如果传入的是"<div>"标签-------creatElement创建对象
					//创建对象步骤（略）
				}else{
					this.elements=sizzle(arg);//如果传入的是"#box",调用getEle选择器方法
				}
				break;
			case 'object':
				this.elements.push(arg);//如果传入的是对象,直接存放在elements里
				break;
		}
	};
	
	//doucument.ready---------------------------------------------------
	function domReady(fn){
		document.addEventListener('DOMContentLoaded', fn, false);
	};
	
	
	//选择器-----------------------------------------------------
	function sizzle(str){
		
		var aChild=[];//容器
		
		switch(str.charAt(0)){
			case '#': //Id
				var obj=document.getElementById(str.substr(1));
				aChild.push(obj);
				break;
			case '.'://className
				var arr=document.getElementsByClassName(str.substr(1));
				for(var j=0;j<arr.length;j++){
					aChild.push(arr[j]);
				}
				break;
			default:
				//标签选择步骤（省略）
		};
		return aChild;
	};
	
	

	//定义事件方法------------------------------------------------------------------------
	var ev_arr="click mouseover mouseout mouseenter mouseleave blur focus change dblclick".split(' ');
	
	for(var i=0;i<ev_arr.length;i++){
		(function (index){
			HXQuery.prototype[ev_arr[i]]=function (fn){
				this.bind(ev_arr[index], fn);
				return this;
			};
		})(i);
	};
	
	//定义其他方法-------------------------------------------------------------------
	//bind
	HXQuery.prototype.bind=function (ev, fn){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].addEventListener(ev,fn,false);
		};
	};
	
	//hover
	HXQuery.prototype.hover=function (over_fn, out_fn){
		this.mouseenter(over_fn);
		this.mouseleave(out_fn);
		return this;
	};
	
	//html
	HXQuery.prototype.html=function (str){
		for(var i=0; i<this.elements.length; i++){
			if(arguments.length==0){//如果没有参数，就是读取数值
				return this.elements[i].innerHTML;
			}else{
				this.elements[i].innerHTML=str;
			}
		};
		return this;
	};
	
	//height
	HXQuery.prototype.height=function(str){
		for(var i=0; i<this.elements.length; i++){
			if(arguments.length==0){
				return parseInt(getComputedStyle(this.elements[i],null).height);
			}else{
				this.elements[i].style.height=str+'px';
			}
		};
		return this;
	};
	
	
	
	//animate
	HXQuery.prototype.animate=function(modeJson,speed,fn){//对象 运动模  速度：时间（秒）
		var obj=this.elements[0];
		var def_speed={fast:300,normal:1000,slow:2000};
		
		if(speed){
			if(typeof speed=="string"){
				speed=def_speed[speed];
			};
		}else{//没有传入speed
			speed=def_speed.normal;
		};
		//起点
		var start={};//初始值
		var dis={};//距离
		
		for(var key in modeJson){//循环计算初始值
			start[key]=parseInt(getComputedStyle(obj,null)[key]);
			dis[key]=modeJson[key]-start[key];
		};
		
		var count=parseInt(speed/30);//时间分段
		var i=0;//计步器
		clearInterval(this.timer);//开定时器之前，先清除定时器  对象增加了一个自定义属性timer作为定时器id
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
		return this;
	};
	

	//暴露给外面-----------------------------------------
	function $(arg){
		return new HXQuery(arg);
	};
	
	window.HXQuery=HXQuery;
	window.$=$;

})(window);