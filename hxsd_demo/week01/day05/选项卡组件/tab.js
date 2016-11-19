// JavaScript Document

function hxsd_tab(id,autoplay,delayTime){//tab盒子的id，  autoplay：true false delayTime:切换时间
	
	var oTab=document.getElementById(id);
	var oUl=oTab.getElementsByClassName('tabList')[0];
	var aLi=oUl.getElementsByTagName('li');
	var tabItem=oTab.getElementsByClassName('tabItem');
	
	var n=0;//自动播放 传入的编号
	var timer;//计时器用变量
	
	//选项卡
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			n=this.index;
			tab_change(n)
			/*for(var i=0;i<aLi.length;i++){
				aLi[i].className='';	
				tabItem[i].style.display="none";
			};		
			this.className='ac';
			tabItem[this.index].style.display="block";*/
			
		};	
	};
	//切换用函数
	function tab_change(n){
		for(var i=0;i<aLi.length;i++){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';	
				tabItem[i].style.display="none";
			};		
			aLi[n].className='ac';
			tabItem[n].style.display="block";
		};
	};
	
	
	//判断是否自动-----------------------------
	if(autoplay){
		function auto_run(){
			timer=setInterval(function(){
				tab_change(n);
				n++;
				if(n==aLi.length){
					n=0;
				}; 
			},delayTime||1000);
		};
		
		auto_run();//开始调用
		//鼠标over停止-------------------------------
		oTab.onmouseover=function(){
			clearInterval(timer);
		};
		
		//鼠标离开重新开始----------------------------
		oTab.onmouseout=function(){
			auto_run();//再次调用
		};
	};
	
	
}
	
		
	


