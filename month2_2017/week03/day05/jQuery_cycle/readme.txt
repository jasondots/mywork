html:

<div class="sliderWrap">
	<ul class="slider">
    	<li><img src="images/banner01.png"></li>
        <li><img src="images/banner02.png"></li>
        <li><img src="images/banner03.png"></li>
    </ul>
    <span class="prevBtn">上一页</span>
    <span class="nextBtn">下一页</span>
    <div class="sliderBtn"></div>
</div>


-----------------------------------------------------------------------


$('.slider').cycle({ 
	fx:'scrollDown',  	//动画方式 fade, scrollLeft, scrollRight,scrollDown

	speed:1000,		//滚动速度

	timeout:4000,		//间隔时间

	pause：true		//鼠标hover 暂停

	prev:".prevBtn",	//向前

	next:".nextBtn",	//向后

	pager:".sliderBtn",	//按钮

	pagerEvent: 'click',	//按钮事件（切换方式）

	showSlideNum:true,	//按钮是否显示数字

	easing:"easeOutBack",	//easing动画扩展

	before:fn 		//动画开始前函数

	after:fn		//动画结束后函数

});	