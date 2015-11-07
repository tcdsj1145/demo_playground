/*监测滚动条*/

$(function() {
	var nScrollHight = 0;
	//滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0;
	//滚动到的当前位置
	var nDivHight = $("#friendlist").height();
	$("#friendlist").scroll(function() {
		nScrollHight = $(this)[0].scrollHeight;
		nScrollTop = $(this)[0].scrollTop;
		//var currentpage=new Number($('#page_select').find("option:selected").text()) ;

		if (nScrollTop + nDivHight + 7 >= nScrollHight) {
			currentpage = new Number($('.i_currentselected').html());
			//alert('addmoreweibo curpage+1 is '+currentpage);//ok
			lastpage = $('#page_select option:last').val();
			currentpage = (currentpage > lastpage ? lastpage : currentpage);
			currentpage = (currentpage < 1 ? 1 : currentpage);

			if (currentpage == lastpage) {//当前页已经是最后一页  滚动到底部就不再刷新

			} else {
				currentpage = currentpage + 1;
				$.ajax({
					url : './getMoreFriend.php',
					type : 'post',
					data : "&pageNumber=" + currentpage,
					dataType : 'text',
					success : function(data) {
						$('#friendlist').append(data);
						$('#page_select').val(currentpage);
						$('.i_currentselected').text(currentpage);
						$('#msg').html(currentpage);
					},
					error : function() {
						alert('sorry @!');
					}
				});
			}
		}
	});

}); 