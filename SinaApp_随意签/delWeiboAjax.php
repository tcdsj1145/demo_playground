<?php
session_start();
include_once ('config.php');
include_once ('saetv2.ex.class.php');

if (empty($_SESSION['oauth2']["user_id"])) {// 若没有获取到access token，则发起授权请求
	include "auth.php";
	exit();
} else {
	$c = new SaeTClientV2(WB_AKEY, WB_SKEY, $_SESSION['oauth2']['oauth_token'], '');
	$pageNumber = $_REQUEST['pageNumber'];
	if (!empty($_REQUEST["id"])) {

		$id = $_REQUEST["id"];
		// request必须是大写
		$c -> delete($id);
		echo $id;
		// header ( "Location: showWeibosBatch.php?pageNumber=" . $pageNumber );
		// exit ();
	} else if (!empty($_REQUEST["ids"])) {
		$ids = $_REQUEST["ids"];
		$delimiter = ',';
		$arr = explode($delimiter, $ids);
		foreach ($arr as $key => $value) {
			$c -> delete($value);//ok
		}
		$idsArr=json_encode($arr);//想要把PHP的数组用js接收的话  得用json的格式传过去  //因为在http之间通信的都是文本   没有对象
		echo $idsArr;

		// header ( "Location: showWeibosBatch.php?pageNumber=" . $pageNumber );

	}
}
?>
