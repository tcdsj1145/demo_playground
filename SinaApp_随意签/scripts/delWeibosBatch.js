/*通过AAjax的方式批量删除微博*/
$(function() {
	//对批量删除按钮监听
	$('#delSeveral').click(function() {
		//alert('`');
		var chk_value = [];
		$('input[name="ids[]"]:checked').each(function() {
			chk_value.push($(this).val());
		});
		//alert(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
		$.ajax({
			url : './delWeiboAjax.php',
			type : 'post',
			data : "&ids=" + chk_value,
			dataType : 'text',
			success : function(data) {
				var arr = JSON.parse(data);
				//alert("callback" + arr[0]);//ok
				$.each(arr, function(n, value) {
					//alert('v'+value);//ok
					$('#' + value).animate({
						height : '0px'
					}, 300);
					setTimeout(function() {
						$('#' + value).css({
							'display' : 'none'
						});
					}, 250);
				});

			},
			error : function() {
				alert('sorry @!');
			}
		});
	});

});
