// JavaScript Document

//屏幕中心显示
function showCenter(obj){
	obj.style.display="block";
	function center(){
		obj.style.left=(document.documentElement.clientWidth-obj.offsetWidth)/2+'px';
		obj.style.top=(document.documentElement.clientHeight-obj.offsetHeight)/2+'px';
	};
	center();
	window.onresize=center;
};
