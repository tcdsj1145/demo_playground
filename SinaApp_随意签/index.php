<?php
session_start ();

include_once ('config.php');
include_once ('saetv2.ex.class.php');


//SaeToAuthV2的构造函数function __construct($client_id, $client_secret, $access_token = NULL, $refresh_token = NULL) {
$o = new SaeTOAuthV2 ( WB_AKEY, WB_SKEY );
$code_url = $o->getAuthorizeURL ( WB_CALLBACK_URL );

// 从POST过来的signed_request中提取oauth2信息
if (! empty ( $_REQUEST ["signed_request"] )) {
	$o = new SaeTOAuthV2 ( WB_AKEY, WB_SKEY );
	$data = $o->parseSignedRequest ( $_REQUEST ["signed_request"] );
	if ($data == '-2') {
		printf ( "%s", "签名错误" );
		die ( '签名错误!' );
	} else {
		$_SESSION ['oauth2'] = $data;
	}
}

// 判断用户是否授权
// $_SESSION['oauth2']["user_id"] uid
// $_SESSION['oauth2']["oauth_token"] access_token
// printf("%s",'ac '.$_SESSION['oauth2']["oauth_token"]);

if (empty ( $_SESSION ['oauth2'] ["user_id"] )) { // 若没有获取到access token，则发起授权请求
	include "auth.php";
	exit ();
} else { // 若已获取到access token，则加载应用信息
	
	$c = new SaeTClientV2 ( WB_AKEY, WB_SKEY, $_SESSION ['oauth2'] ['oauth_token'], '' );
	
	$uid_get = $c->get_uid (); // 注意这里的uid_get并不是一个字符串 而是一个数组
	                           // echo '<br>'.$uid_get['uid'];
	
	$uid = $uid_get ['uid'];
	$userInfo = $c->show_user_by_id ( $uid );
	$totalWeiboCount = $userInfo ['statuses_count'];
	$totalFriendsCount = $userInfo ['friends_count'];
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style>
body {
	background: url("pics/bg.png");
	background-repeat: repeat;
}
</style>

</head>

<body>


	<?php 
	include "showWeibosBatch.php";
	?>

	
</body>
</html>

