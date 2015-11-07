<?php
include_once( 'config.php' );
?>
<html>
<style>
body{
	background:url("pics/bg.png");
	background-repeat: repeat;
}
</style>

<script src="http://tjs.sjs.sinajs.cn/t35/apps/opent/js/frames/client.js" language="JavaScript"></script>
<script> 



function authLoad(){
 	App.AuthDialog.show({
	client_id : '<?=WB_AKEY;?>',    //必选，appkey
	redirect_uri : '<?="http://apps.weibo.com/rakusdeletion"?>',     //必选，授权后的回调地址，例如：http://apps.weibo.com/giftabc
	height: 120    //可选，默认距顶端120px
       
	});
}
</script>
<body onload="authLoad()" ></body>
</html>