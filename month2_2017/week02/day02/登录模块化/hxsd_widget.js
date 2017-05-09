// JavaScript Document

//modal模态组件
function modal_layer(){
	var modal=$('<div class="modal"></div>');
	$('body').append(modal);
	return modal;
};

//登录框
function logon_box(){
	//创建模态层
	var modal=modal_layer();
	
	//创建弹框
	var html='<div class="popBox popBox_logon"><h4>用户登录</h4>'+
	'<a id="closeBtn" class="close_btn" href="javascript:;">×</a>'+
	'<p><label>用户名：<input type="text"></label></p>'+
	'<p><label>密　码：<input type="password"></label></p>'+
	'<p><button id="logonBtn" class="logonBtn" type="button">登录</button></p></div>';
	var oDiv=$(html);
	
	$('body').append(oDiv);
	
	showCenter(oDiv);
	drag(oDiv);
	
	$('.close_btn').click(function(){
		oDiv.remove();
		modal.remove();
		
	});
	
}