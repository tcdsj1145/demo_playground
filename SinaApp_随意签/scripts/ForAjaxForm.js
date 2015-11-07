/*异步提交Form数据   需要用到jQuery.form插件*/
$(document).ready(function() {
	// alert('start');
	$('#formWrite').submit(function()//提交表单
	{
		//alert("ddd");
		var options = {
			target : '#Tip', //后台将把传递过来的值赋给该元素//不指定TIP就会失效！
			url : 'faWeibo2.php', //提交给哪个执行
			type : 'POST',
			success : function(responseText, statusText, xhr, $form) {

				//alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + '\n\nThe output div should have already been updated with the responseText.');
			} //显示操作提示
		};
		$('#formWrite').ajaxSubmit(options);
		return false;
		//return false;//为了不刷新页面,返回false，反正都已经在后台执行完了，没事！
		// alert('end');
	});
});
