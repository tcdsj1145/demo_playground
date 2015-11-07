/*翻页用通过Ajax的方式刷新微博list*/
$(function() {

	$('#weiboNextPage').click(function() {
		var currentpage = new Number($('#page_select').find("option:selected").text());
		currentpage=new Number( $('.i_currentselected').html());
		currentpage = currentpage + 1;
		var weiboType = $("input[name='weiboType']:checked").val();
		var seq=1;
		if ($('#backseq').prop('checked')) {
			// alert('backeq');
			seq=1;
		}else{
			// alert('notseq');
			seq=0;
		}
		

		lastpage = $('#page_select option:last').val();
		currentpage = (currentpage > lastpage ? lastpage : currentpage);
		
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

	$('#weiboPrePage').click(function() {
		var currentpage = new Number($('#page_select').find("option:selected").text());
		currentpage=new Number( $('.i_currentselected').html());
		currentpage = currentpage - 1;
		var weiboType = $("input[name='weiboType']:checked").val();
		if ($('#backseq').prop('checked')) {
			seq=1;
		}else{
			seq=0;
		}
		
		currentpage = (currentpage < 1 ? 1 : currentpage); 
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
