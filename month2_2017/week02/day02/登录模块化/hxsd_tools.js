// JavaScript Document
//居中显示弹框
function showCenter(obj){
	obj.css('display','block');
	function run(){
		var l=($(window).width()-obj.outerWidth())/2;
		var t=($(window).height()-obj.outerHeight())/2;
		obj.css({'left':l,'top':t})
	};
	run();
	$(window).resize(run);
};



//拖拽
function drag(obj,title){
	title =title||obj;
	//获取鼠标偏移
	title.mousedown(function(ev){
		var disX=ev.pageX-obj.offset().left;//left方向
		var disY=ev.pageY-obj.offset().top;// top 方向
		$(document).mousemove(function(ev){
			var l=ev.pageX-disX;
			var t=ev.pageY-disY;
			if(l<0)l=0;
			if(t<0)t=0;
			var s_w=$(window).width();
			var s_h=$(window).height();
			
			if(l>s_w-obj.outerWidth()) l=s_w-obj.outerWidth();
			if(t>s_h-obj.outerHeight()) t=s_h-obj.outerHeight();
			obj.css({'left':l,'top':t})
		});
		//释放鼠标move事件
		$(document).mouseup(function(){
			$(document).unbind('mousemove');
		});
		ev.preventDefault();
	});
};