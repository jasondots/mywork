html:

<div class="sliderWrap">
	<ul class="slider">
    	<li><img src="images/banner01.png"></li>
        <li><img src="images/banner02.png"></li>
        <li><img src="images/banner03.png"></li>
    </ul>
    <span class="prevBtn">��һҳ</span>
    <span class="nextBtn">��һҳ</span>
    <div class="sliderBtn"></div>
</div>


-----------------------------------------------------------------------


$('.slider').cycle({ 
	fx:'scrollDown',  	//������ʽ fade, scrollLeft, scrollRight,scrollDown

	speed:1000,		//�����ٶ�

	timeout:4000,		//���ʱ��

	pause��true		//���hover ��ͣ

	prev:".prevBtn",	//��ǰ

	next:".nextBtn",	//���

	pager:".sliderBtn",	//��ť

	pagerEvent: 'click',	//��ť�¼����л���ʽ��

	showSlideNum:true,	//��ť�Ƿ���ʾ����

	easing:"easeOutBack",	//easing������չ

	before:fn 		//������ʼǰ����

	after:fn		//������������

});	