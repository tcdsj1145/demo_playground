$(function(){
	textFocus();
	checkInput();
	closePopup();
	clickEmotion();
	emotionCategoryFlip();
	clickEmotionCategory();
	clickPhoto();
	clickMore();
});
var textFocus=function(){
	$('textArea.text').on('focus',function(){
		$('.words_count').css('display', 'block');
		$('.hotWeibo').css('display','none');
	}).on('blur',function(){
		$('.words_count').css('display', 'none');
		$('.hotWeibo').css('display','block');
	});
}
var checkInput=function(){
	$('textArea.text').on("focus blur keyup input paste",function(){
		var str=$(this).val();
		//;
		//str.length>140?($(this).val(str.substring(0,140))):($('.words_count .wordNum').text(140-str.length));
		//上面的写法可读性较差   而且现在后来发现字数超出 未超出 都有较多的操作
		//有两种情况下不能发微博  字数超出和一字未写
		if(str.length>140){
			//$(this).val(str.substring(0,140));//i found that weibo did not substring
			$('.words_count .wordNum').text("-"+(str.length-140));
			//add style for word num red
			$('.words_count .wordNum').addClass('fontRed');
			//weibo btn grey
			$('button.weiboBtn').removeClass('red').addClass('grey');
		}else if(str.length==0){
			$('.words_count .wordNum').text(140);
			$('button.weiboBtn').removeClass('red').addClass('grey');
		}else{
			$('.words_count .wordNum').text(140-str.length);
			//remove word num red style
			$('.words_count .wordNum').removeClass('fontRed');
			//weibo btn red
			$('button.weiboBtn').removeClass('grey').addClass('red');
		}

	});
}

function closePopup(){
	$('a.closepopout').click(function(){
		$('.main_popout').css('display', 'none');
	});
}

function clickEmotion(){
	function showEmotion(){
		$('.main_popout').css('display','block');
		$('.main_popout_content').text('');
		//表情资源都放在popoutWrapper中了
		$('.emotionList_wrapper').clone(true).appendTo('.main_popout_content');

	};
	$('.emotionBtn_wrapper i.emotion').bind('click',function(event) {
		showEmotion();
	});
	$('.emotionBtn_wrapper span').bind('click',  function(event) {
		showEmotion();
	});

}

function emotionCategoryFlip(){
	function isLast(curUL){
		return curUL.is(':last-child')?true:false;
	}
	function isFirst(curUL){
		return curUL.is(':first-child')?true:false;
	}
	function checkBorderState(){
		curUL=$('ul.emotion_category.current');
		//这四个都是并列关系
		//当只有一个节点的时候  可以同时第一个 也是最后一个
		if(isFirst(curUL)){
			$('.emotionList_wrapper .pagePre').addClass('disable');	
		}
		if(isLast(curUL)){
			$('.emotionList_wrapper .pageNext').addClass('disable');	
		}
		if(!isFirst(curUL)){
			$('.emotionList_wrapper .pagePre').removeClass('disable');	
		}
		if(!isLast(curUL)){
			console.log('not last');
			$('.emotionList_wrapper .pageNext').removeClass('disable');	
		}

	}
	$('.emotionList_wrapper .pagePre').click(function(event) {
		/* Act on the event */
		curUL=$('ul.emotion_category.current');
		checkBorderState();
		if(!isFirst(curUL)){
			curUL.removeClass('current');
			curUL=curUL.prev('ul.emotion_category');
			console.log(curUL.attr('class'));
			curUL.addClass('current');
			checkBorderState();
		}
	});
	$('.emotionList_wrapper .pageNext').click(function(event) {
		/* Act on the event */
		curUL=$('ul.emotion_category.current');
		checkBorderState();	
		if(!isLast(curUL)){
			curUL.removeClass('current');
			curUL=curUL.next('ul.emotion_category');
			curUL.addClass('current');
			checkBorderState();
			
		}
	});	
}

function clickEmotionCategory(){
	$('.emotion_category_wrapper li.categoryItem').click(function(event) {
		/* Act on the event */
		// default click
		if($(this).hasClass('default')){
			$('.emotionList').css('display', 'none');
			$('.emotionList.default').css('display', 'block');
			$('.emotion_category_wrapper li.categoryItem').removeClass('current');
			$(this).addClass('current');			
		}
		// langxiaohua click
		if($(this).hasClass('langxiaohua')){
			$('.emotionList').css('display', 'none');
			$('.emotionList.langxiaohua').css('display', 'block');
			$('.emotion_category_wrapper li.categoryItem').removeClass('current');
			$(this).addClass('current');
		}
	});
}


function clickPhoto(){
	function showPhoto(){
		$('.main_popout_title span').text('Photo');
		$('.main_popout').css('display','block');
		$('.main_popout_content').text('');
		//photo资源都放在popoutWrapper中了
		$('.photo_wrapper').clone(true).appendTo('.main_popout_content');

	};
	$('.photoBtn_wrapper i').bind('click',function(event) {
		showPhoto();
	});
	$('.photoBtn_wrapper span').bind('click',  function(event) {
		showPhoto();
	});
}

function clickMore(){
	function showMoreMenu(){
		$('.moreMenu').css('display', 'block');
		//change triangle
		$('.moreBtn_wrapper i.triangle').removeClass('down').addClass('up');
	}
	$('.moreBtn_wrapper').click(function(event) {
		showMoreMenu();
		$(document).on("click", function () {//对document绑定一个影藏Div方法 
			$('.moreMenu').css('display', 'none');
			$('.moreBtn_wrapper i.triangle').removeClass('up').addClass('down');
	    }); 
		event.stopPropagation();//阻止事件向上冒泡 
	});
	$('.moreMenu').click(function (event) { 
		event.stopPropagation();//阻止事件向上冒泡 
	}); 
}