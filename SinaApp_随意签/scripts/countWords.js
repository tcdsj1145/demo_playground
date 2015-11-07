/*字数控制=========================================================*/
$(function() {

	$('.titleArea').keyup(function() {
		// alert('123');
		//var hidTitleWordNum = parseInt($('.hidTitleWordNum').val());
		var hidTitleWordNum = 280;
		var titleAreaVal = $('.titleArea').val();

		var sum = 0;
		if (titleAreaVal.length > 0) {

			for (var i = 0; i < titleAreaVal.length; i++) {
				if ((titleAreaVal.charCodeAt(i) >= 0) && (titleAreaVal.charCodeAt(i) <= 255)) {
					sum = sum + 1;
				} else {
					sum = sum + 2;
				}
				if (sum > hidTitleWordNum) {
					//alert("输入数据超长！不能再输入数据。");
					/*$('.titleArea').css({
					 "background-color" : "#FA8072"
					 });*/
					$('.titleArea').css({
						"background-color" : "#FA8072"
					});
					$(".titleArea").animate({
						backgroundColor : "#FFFFF"
					}, 500);
					//舍弃该效果 现在有了更好的
					/*setTimeout(function(){
					$('#textAreaDiv').css({
					"background-color":"#FFFFFF"
					});
					},2000);*/
					//$('#textAreaDiv').fadeTo("slow", 0.0);//这样不行 连同整个输入框都消失了
					var str = titleAreaVal.substring(0, i);
					$('.titleArea').val(str);
					$('.titleWordNum').html(0);
					break;
				} else {
					$('.titleWordNum').html(Math.floor((hidTitleWordNum - sum) / 2));

				}
			}
		} else {
			$('.titleWordNum').html(140);
		}

	});

});
