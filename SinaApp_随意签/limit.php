<?php
session_start();
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

if (empty($_SESSION['oauth2']["user_id"])) {//若没有获取到access token，则发起授权请求
	include "auth.php";
	exit;
} else {
	$c = new SaeTClientV2( WB_AKEY , WB_SKEY ,$_SESSION['oauth2']['oauth_token'] ,'' );
	$rs=$c->rate_limit_status();
	echo '"remaining_ip_hits'.$rs['remaining_ip_hits'];
	echo '"remaining_user_hits'.$rs['remaining_user_hits'];
	echo '"remaining_ip_hits'.$rs['remaining_ip_hits'];
	echo '"reset_time'.$rs['reset_time'];
	echo 'user_limit'.$rs['user_limit'];
	
}

?>