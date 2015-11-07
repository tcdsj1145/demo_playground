/*当倒序第一次被点击  应当根据当前页面刷新全部微博*/
$(function() {
	$('#backseq').click(function() {
		
		currentpage = new Number($('.i_currentselected').html());
		if ($('#backseq').prop('checked')) {
			seq = 1;
		} else {
			seq = 0;
		}
		$.ajax({
			url : './getMoreWeibo.php',
			type : 'post',
			data : "&pageNumber=" + currentpage + "&backseq=" + seq,
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
