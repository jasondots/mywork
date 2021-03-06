// JavaScript Document

//modal模态组件
function modal_layer(){
	var modal=document.createElement('div');
	modal.className="modal";
	document.body.appendChild(modal);
	return modal;
};

//错误提示组件
function popBox_error(text,delayTime){
	
	//定义全局属性
	if(!window.errBox){  //不能用 window.errBox==false  因为errBox开始时是不存在的
		var errDiv=document.createElement('div');
		var timer=null;
		errDiv.className="popBox_error";
		errDiv.innerHTML=text;
		document.body.appendChild(errDiv);
		popShow(errDiv);
		window.errBox=true;
	};
	
	
	function delay_del(){
		timer=setTimeout(function(){
			document.body.removeChild(errDiv);	
			delete window.errBox;
			//window.errBox=false;
		}, delayTime || 2000);
	};
	
	delay_del();

	errDiv.onmouseover=function(){
		clearTimeout(timer);
	};
	errDiv.onmouseout=function(){
		delay_del()
	}
};



//登录框
function logon_box(){
	//创建模态层
	var modal=modal_layer();
	
	//创建弹框
	var oDiv=document.createElement('div');
	oDiv.id="logon_box";
	oDiv.className="popBox popBox_logon";
	
	var html='<h4>用户登录</h4>'+
	'<a id="closeBtn" href="javascript:;">×</a>'+
	'<p><label>用户名：<input type="text"></label></p>'+
	'<p><label>密　码：<input type="password"></label></p>'+
	'<p><button class="logonBtn" type="button">登录</button></p>';
	
	//oDiv内部插入其他元素
	oDiv.innerHTML=html;
	
	document.body.appendChild(oDiv);//插入到页面
	
	var closeBtn=document.getElementById('closeBtn');
	var title=oDiv.getElementsByTagName('h4')[0];
	var input=document.getElementsByTagName('input');
	
	input[0].onmousedown=function(ev){//输入框阻止冒泡，可以输入文字
		var oEv=ev ||window.event;
		oEv.cancelBubble=true;
	};
	input[1].onmousedown=function(ev){//输入框阻止冒泡，可以输入文字
		var oEv=ev ||window.event;
		oEv.cancelBubble=true;
	}
	
	modal.style.display="block";//显示模态层
	
	popShow(oDiv);//居中显示
	drag(oDiv,title);//可以拖拽
	
	//关闭弹框
	closeBtn.onclick=function(){
		document.body.removeChild(modal);
		document.body.removeChild(oDiv);
	};
}