<?php
session_start ();
include_once ('config.php');
include_once ('saetv2.ex.class.php');

if (empty ( $_SESSION ['oauth2'] ["user_id"] )) { // 若没有获取到access token，则发起授权请求
	include "auth.php";
	exit ();
} else {
	$c = new SaeTClientV2 ( WB_AKEY, WB_SKEY, $_SESSION ['oauth2'] ['oauth_token'], '' );
	$pageNumber = $_REQUEST ['pageNumber'];
	if (!empty ( $_REQUEST ["id"] )) {
		
		$id = $_REQUEST ["id"]; // request必须是大写
		$c->delete ( $id );
		echo $id;
		//header ( "Location: showWeibosBatch.php?pageNumber=" . $pageNumber );
		//exit ();
	}else if(!empty($_REQUEST ["ids"])){
		$ids=$_REQUEST ["ids"];
		foreach ($ids as $id) {
			$c->delete($id);
		}
		header ( "Location: showWeibosBatch.php?pageNumber=" . $pageNumber );			
		
	}
}
?>
