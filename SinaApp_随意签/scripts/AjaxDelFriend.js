/*删除=========================================*/
function toDel(btn) {
	// alert(111);
	var id = btn.getAttribute("name");
	//alert($('#'+id).attr('id'));//ok
	//$('#' + id).css({
	//padding" : "0px",
	//});

	$.ajax({
		url : './delFriend.php',
		type : 'post',
		data : "&id=" + id,
		dataType : 'text',
		success : function(data) {
			//这个的data是什么的
			//提交去往的页面的echo的内容就是data
			//alert(data+'has deled');
			var greydiv = $('#' + data);
			//setTimeout(greydiv.fadeOut(), 500);
			//$('#'+id).animate({height:'0px'},500);
			$('#' + id).animate({
				height : '0px'
			}, 500);
			setTimeout(function() {
				$('#' + id).css({
					'display' : 'none'
				});
			}, 450);
		},
		error : function() {
			alert('sorry @!');
		}
	});

}

