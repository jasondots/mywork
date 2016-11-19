// JavaScript Document

//modal模态组件
function modal_layer(){
	var modal=document.createElement('div');
	modal.id="black_modal";
	modal.className="modal";
	document.body.appendChild(modal);
};

//错误提示组件
function popBox_error(text,delayTime){
	var t=delayTime || 2000;
	var errDiv=document.createElement('div');
	var timer=null;
	errDiv.className="popBox_error";
	errDiv.innerHTML=text;
	document.body.appendChild(errDiv);
	popShow(errDiv);
	
	function delay_del(){
		document.body.removeChild(errDiv);	
	};
	timer=setTimeout(function(){
		delay_del();
	},t);
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
	modal_layer();
	var modal=document.getElementById('black_modal');
	
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
};

//幻灯片
function slide(id,showBtnNum){
	var sld=document.getElementById(id);
	var ol=sld.getElementsByTagName('ol')[0];
	var oUl=sld.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	
	var pBtn=sld.children[0];
	var nBtn=sld.children[1];
	var n=0;//当前显示图片索引
	
	for(var i=0; i<aLi.length; i++){
		var li=document.createElement('li');
		if(i==0) li.className='ac';
		if(showBtnNum) li.innerHTML=i+1;
		ol.appendChild(li);
	};
	var aBtn=ol.children;
	
	//设定ul宽度
	var li_w=getStyle(aLi[0], 'width');//图片的宽度
	oUl.style.width=li_w*aLi.length +'px';
	
	//添加点击事件
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;//发牌照
		
		aBtn[i].onclick=function(){
			//改变当前显示索引
			n=this.index;
			changeAc();
			move(oUl,{'left':-li_w*n})
		};
	};
	
	pBtn.onclick=function(){
		n--;
		if(n<0) n=0;
		move(oUl,{'left':-li_w*n});
		changeAc();
		
	}
	
	//左右按钮动作

	nBtn.onclick=function(){
		n++;
		if(n>=aLi.length-1) n=aLi.length-1;
		move(oUl,{'left':-li_w*n});
		changeAc();
	};
	//-----------------------------------------
	function changeAc(){
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className='';
		};
		aBtn[n].className='ac';
	}
	





}