
function tab(obj,fn){
	var aLi=obj.getElementsByTagName('li');//内部变量
	var aTabItem=obj.getElementsByClassName('tabItem');//内部变量
	
	//选项卡
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		
		aLi[i].onclick=function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';
				aTabItem[i].style.display='none';	
			};		
			this.className='ac';
			aTabItem[this.index].style.display='block';	
			
			fn && fn(this.index,aTabItem);//内部变量，作为参数传递出去
		};	
	};
}	


