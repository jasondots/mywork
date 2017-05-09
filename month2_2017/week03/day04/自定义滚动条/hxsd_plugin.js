// JavaScript Document
$(document).bind("mouseup",function(ev){
	var target=$(ev.target);
	if(target.closest(".pop").length==0)$(".pop").hide();
});


//jquery本身扩展方法  封装小工具 不依赖对象，可以独立运行的
$.extend({
	//模态层
	modalLayer:function(){
		var modal=$('<div style="height:100%,width:100%,position:fixed,top:0,left:0,background:black,opacity:.3,z-index:70"></div>')
		$('body').append(modal);
		return function(){
			modal.remove();
		};
	},
	
	//alertBox
	alertBox:function(txt){
		var removeModal=$.modalLayer();//模态层
		var alertDiv=$('<div class="popBox alertBox"><h4 class="title">警告</h4><a class="closeBtn" href="javascript:;">×</a><div class="popCont"><p>'+txt+'</p></div><div class="btnBar"><button type="button" class="okBtn">确定</button> </div></div>');
		$('body').append(alertDiv);
		alertDiv.showCenter().drag({title:true});//中心显示  拖拽
		alertDiv.find('.closeBtn,.okBtn').click(function(){
			removeModal();
			alertDiv.remove();
		});
	},
	
	//confirm
	confirmBox:function(txt,fn){
		var removeModal=$.modalLayer();
		var con_div=$('<div class="popBox confrimBox"><h4 class="title">请确认</h4><a class="closeBtn" href="javascript:;">×</a><div class="popCont"><p>'+txt+'</p></div><div class="btnBar"><button type="button" class="okBtn">确定</button><button type="button" class="cancelBtn">取消</button> </div></div>');
		$(document.body).append(con_div);
		con_div.showCenter().drag({title:true});;
		con_div.find('.closeBtn,.okBtn,.cancelBtn').click(function(){
			removeModal();
			con_div.remove();
		});
		con_div.find('.okBtn').click(function(){
			fn&&fn();
		});
	},
	
	//prompt
	promptBox:function(txt,fn){
		var removeModal=$.modalLayer();//加载模态层
		var pro_div=$('<div class="popBox promptBox"><h4 class="title">'+txt+'</h4><a class="closeBtn" href="javascript:;">×</a><div class="popCont"><textarea></textarea></div><div class="btnBar"><button type="button" class="okBtn">确定</button><button type="button" class="cancelBtn">取消</button> </div></div>');
		$(document.body).append(pro_div);
		pro_div.showCenter().drag({title:true});
		var oTextarea=pro_div.find('textarea').focus();//获得焦点

		pro_div.find('.okBtn').click(function(){
			fn && fn(oTextarea.val());
		});
		pro_div.find('.closeBtn,.okBtn,.cancelBtn').click(function(){
			removeModal();//删除模态层
			pro_div.remove();
		});
	},
	
	
	//判断屏幕上下半屏
	v_half_screen:function(obj){
		var scrollTop=$(window).scrollTop();
		var elm_pos=obj.offset().top;
		var screen_h=$(window).height();
		return scrollTop+screen_h/2<elm_pos ? false : true;  //false:上半屏  true:下半屏
	},
	
	//判断是否有父级
	isParent:function (oParent,obj){
		while(obj){
			if(obj==oParent)return true;
			obj=obj.parentNode;
		}	
		return false;
	},
	
});


//-----------------------------------------------------------------------
//jquery包装“对象”扩展方法  可以链式操作

$.fn.extend({
	//checkAll
	checkAll:function(elms){
		return this.each(function() {
			var _this=$(this);
			$(this).click(function(){
				elms.prop('checked',$(this).prop('checked'));
			});
			elms.click(function(){
				var num=0;
				elms.each(function(){
					$(this).prop('checked') ? num++ :num--;
				});
				_this.prop('checked',  num==elms.length ? true :false  )
			});
		});
	},
	
	//中心显示
	showCenter:function(){
		return this.each(function() {
			var _this=$(this);
			_this.css('display','block');
			function center(){
				_this.css('left',($(window).width()-_this.outerWidth())/2);
				_this.css('top',($(window).height()-_this.outerHeight())/2);
			};
			center();
			$(window).resize(center);
		});
	},
	
	//拖拽----------------------------------
	drag:function(title){
		return this.each(function(){
			title=title || $(this);
			var _this=$(this);
			title.mousedown(function(ev){
				var offset=_this.offset();
				var disX=ev.pageX-offset.left; //x方向偏移
				var disY=ev.pageY-offset.top; //y方向
				//鼠标按下  为document绑定move事件-----------------------------
				$(document).bind("mousemove",function(ev){
					var l=ev.pageX-disX;
					var t=ev.pageY-disY;
					if(l<0){
						l=0;
					}
					if(t<0){
						t=0;
					};
					var s_w=$(window).width();//屏幕宽度
					var s_h=$(window).height();
					if(l>s_w-_this.outerWidth()){
						l=s_w-_this.outerWidth()
					};
					if(t>s_h-_this.outerHeight()){
						t=s_h-_this.outerHeight()
					};
					_this.css({"left":l,"top":t});
				});
				//鼠标抬起，解绑move事件------------------------------
				$(document).mouseup(function(){
					$(document).unbind('mousemove');
				});
				//取消默认事件（阻止圈选文字）--------------------------------
				return false;
			});	
		});
	},
	//滚轮
	mouseWheel:function(fn){
		return this.each(function(){
			if(window.navigator.userAgent.indexOf('Firefox')!=-1){
				 this.addEventListener('DOMMouseScroll',wheelFn,true);
			}else{
				this.onmousewheel=wheelFn;
			};
			function wheelFn(ev){
				var direct=ev.wheelDelta ? ev.wheelDelta<0 : ev.detail>0;
				fn && fn(direct);//将direct作为参数传递出去
				ev.preventDefault();//DOM2级 阻止默认事件 firefox
			};
		})
	},
	
	/*mouseWheel:function(fn){
		return this.each(function(){
			if(window.navigator.userAgent.indexOf('Firefox')!=-1){
				 this.addEventListener('DOMMouseScroll',wheelFn,true);
			}else{
				this.onmousewheel=wheelFn;
			};
			function wheelFn(ev){
				ev=ev||event;
				var direct=ev.wheelDelta ? ev.wheelDelta<0 : ev.detail>0;
				fn && fn(direct);//将direct作为参数传递出去
				if(window.event){//IE
					ev.returnValue = false; //ie 阻止默认事件
					return false;//ie9 以上阻止回车
				}
				else{
					ev.preventDefault();//DOM2级 阻止默认事件 firefox
				}
			};
		})
	},*/
	
	
	//选项卡插件
	tab:function(opt){
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
	},
	
	
		
		
});

