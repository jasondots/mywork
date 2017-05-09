// JavaScript Document

//模态层
function modal(){
	var mLayer=document.createElement('div');
	mLayer.className='modal';
	document.body.appendChild(mLayer);	
	return function(){
		document.body.removeChild(mLayer);
	}
};

//
function alertBox(txt){
	var delModal=modal();
	var box=document.createElement('div');
	box.className='alertBox';
	box.innerHTML='<a href="javascript:;">×</a><p>'+txt+'</p><button type="button">确定</button>';
	document.body.appendChild(box);
	showCenter(box);
	var okBtn=box.getElementsByTagName('button')[0];
	var closeBtn=box.getElementsByTagName('a')[0];
	okBtn.onclick=closeBtn.onclick=function(){
		document.body.removeChild(box);
		delModal();
	}
};