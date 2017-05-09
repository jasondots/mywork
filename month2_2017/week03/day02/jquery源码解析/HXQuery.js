
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
					this.elements=sizzle(arg);//如果传入的是"#box",调用sizzle选择器方法
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
				var arr=document.getElementsByTagName(str);
				for(var j=0;j<arr.length;j++){
					aChild.push(arr[j]);
				};
				break;
				//复杂嵌套选择步骤省略
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
	
	HXQuery.prototype.animate=function(modeJson,speed,fn){ //对象  要运动的模式  速度
		var obj=this.elements;
		for(var k=0; k<obj.length; k++){
		
			var def_speed={//默认速度
				fast:400,
				normal:800,
				slow:1600
			};
			
			//判断速度的默认值
			if(speed){
				if(typeof speed=="string"){//传入的是字符串
					speed=def_speed[speed];
				}
			}else{
				speed=def_speed.normal;
			};
			//---------------------------------------------
			var m_style=getComputedStyle(obj[k],null);//读取初始值
			var start={};
			var dis={};
			
			var count=parseInt(speed/30);//通过时间,计算步数
			var step={};
			
			for(var key in modeJson){
				start[key]=parseInt(m_style[key]);
				dis[key]=modeJson[key]-start[key];
				step[key]=dis[key]/count;
			};
			var i=0;
			
			clearInterval(obj[k].timer);//用对象的自定义属性作为定时的变量
			obj[k].timer=setInterval(function(){
				i++;
				for(var key in modeJson){
					obj[k].style[key]=start[key]+step[key]*i+"px";
				};
				if(i==count){
					clearInterval(obj[k].timer);
					fn && fn();
				};
			},30);
			return this;
		}
	};
	

	//暴露给外面-----------------------------------------
	function $(arg){
		return new HXQuery(arg);
	};
	
	window.HXQuery=HXQuery;
	window.$=$;

})(window);