// JavaScript Document

;(function($) {
	$.fn.tab=function(opt){
		//默认值-----------------------------------
		var def={
			autoRun:true,
			speed:1000,
		};
		//新的设定值替换默认值---------------------------------------
		var op=$.extend({},def,opt);
		//----------------------------------------
		return this.each(function(){
			var timer;
			var i=0;
			var _this=$(this);
			var oUl=_this.children('.tabList');
			var aLi=oUl.children();
			var tabItem=_this.find('.tabItem');
			aLi.click(function(){
				$(this).addClass('ac').siblings().removeClass('ac');
				tabItem.eq($(this).index()).removeClass('hide').siblings().addClass('hide');
				i=$(this).index();
			});
			//----------------------------------------
			if(op.autoRun){
				function auto(){
					timer=setInterval(function(){
						i++;
						if(i==aLi.length){
							i=0;
						};
						aLi.eq(i).addClass('ac').siblings().removeClass('ac');
						tabItem.eq(i).removeClass('hide').siblings().addClass('hide');
					},op.speed);
				};
				auto();
				//----------------------------------------
				_this.hover(
					function(){
						clearInterval(timer);
					},
					function(){
						auto();
					}
				);
			};
		});
	};

})(jQuery);
