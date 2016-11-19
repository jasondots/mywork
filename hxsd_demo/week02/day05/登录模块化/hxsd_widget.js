// JavaScript Document

//modal模态组件
function modal_layer(){
	var modal=document.createElement('div');
	modal.id="black_modal";
	modal.className="modal";
	document.body.appendChild(modal);
};

//登录框
function logon_box(){
	//创建模态层
	modal_layer();
	var modal=document.getElementById('black_modal');
	
	//创建弹框
	var oDiv=document.createElement('div');
	oDiv.className="popBox popBox_logon";
	
	var html='<h4>用户登录</h4>'+
	'<a id="closeBtn" class="close_btn" href="javascript:;">×</a>'+
	'<p><label>用户名：<input type="text"></label></p>'+
	'<p><label>密　码：<input type="password"></label></p>'+
	'<p><button id="logonBtn" class="logonBtn" type="button">登录</button></p>';
	
	//oDiv内部插入其他元素
	oDiv.innerHTML=html;
	
	document.body.appendChild(oDiv);//插入到页面
	
	var title=oDiv.getElementsByTagName('h4')[0];
	popShow(oDiv,title);//居中显示
	
	var closeBtn=document.getElementById('closeBtn');

	drag(oDiv,title);//可以拖拽
	
	//关闭弹框
	closeBtn.onclick=function(){
		document.body.removeChild(modal);
		document.body.removeChild(oDiv);
	};
}