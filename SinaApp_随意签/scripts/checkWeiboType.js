/*根据微博类别被选中时 即刻刷新*/

$(document).ready(function() {
	$(".radioType").change(function() {
		var weiboType = $("input[name='weiboType']:checked").val();
		// alert($selectedvalue);
		/*if ($selectedvalue == 0) {
		alert('0');
		} else if($selectedvalue==1){
		alert('1');
		}else {
		alert('2');
		}*/

		// var weiboType = $("input[name='weiboType']:checked").val();
		// alert('SSSS'+item);
		//var currentpage = new Number($('#page_select').find("option:selected").text());
		currentpage = new Number($('.i_currentselected').html());

		if ($('#backseq').prop('checked')) {
			seq = 1;
		} else {
			seq = 0;
		}


		$.ajax({
			url : './getMoreWeibo.php',
			type : 'post',
			data : {
				'pageNumber' : currentpage,
				'weiboType' : weiboType,
				'backseq' : seq
			},
			dataType : 'text',
			success : function(data) {
				$('#weibolist').html(data);
				$('#page_select').val(currentpage);
				$('.i_currentselected').html(currentpage);
			},
			error : function() {
				alert('sorry @!');
			}
		});

	});
});
