<?php
session_start();
include_once ('config.php');
include_once ('saetv2.ex.class.php');

if (empty($_SESSION['oauth2']["user_id"])) {// 若没有获取到access token，则发起授权请求
	include "auth.php";
	exit();
} else {
	$c = new SaeTClientV2(WB_AKEY, WB_SKEY, $_SESSION['oauth2']['oauth_token'], '');
	$uid = $_SESSION['oauth2']["user_id"];

	//$c->update("显示不了街道？",34.692375,135.547801,'');//参数这里''表示NULL
	//检测是否获取到了值
	$getText = $_POST["weiboText"];
	//接收GET方法传递的参数keywords
	if (empty($getText)) {
		echo "没有写微博内容";
		$getText = "";
	} else {
		echo $getText;
	}

	$getLat = $_POST["geolat"];
	//$getLat = 62.247466;
	//echo $getLat;
	$getLng = $_POST["geolong"];
	//$getLng = 26.010132;
	//echo $getLng;

	//上传图片部分=======================================================================
	//上传文件类型列表
	$uptypes = array('image/jpg', 'image/jpeg', 'image/png', 'image/pjpeg', 'image/gif', 'image/bmp', 'image/x-png');

	$max_file_size = 2000000;
	//上传文件大小限制, 单位BYTE
	$destination_folder = "SAE_TMP_PATH/";
	//不用\符号  是为了确保能够跨平台
	//上传文件路径

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		if (!is_uploaded_file($_FILES["upfile"][tmp_name]))//是否存在文件
		{
			//echo "图片不存在!";
			$c -> update($getText, $getLat, $getLng, "");
			exit();
		}else{
			echo $_FILES["upfile"][tmp_name];
		}

		$file = $_FILES["upfile"];
		if ($max_file_size < $file["size"])//检查文件大小
		{
			//echo "文件太大!";
			exit();
		}

		if (!in_array($file["type"], $uptypes))//检查文件类型
		{
			//echo "文件类型不符!" . $file["type"];
			exit();
		}

		/*if (!file_exists($destination_folder)) {
			mkdir($destination_folder);
		}*/
		/*if(chmod($destination_folder,0757)){
		 echo '文件權限更改成功';
		 }*/

		$filename = $file["tmp_name"];
		$image_size = getimagesize($filename);
		$pinfo = pathinfo($file["name"]);
		$ftype = $pinfo['extension'];
		$destination = $destination_folder . time() . "." . $ftype;
		//if (chmod($destination, 0666)) {
			//echo '文件權限更改成功';
		//}
		//echo '<hr>filename:' . $filename . '   destination""' . $destination;
		if (file_exists($destination) && $overwrite != true) {
			//echo "同名文件已经存在了";
			exit();
		}

		/*if (!move_uploaded_file($filename, $destination)) {
		 echo "移动文件出错";
		 exit();
		 }*/

		//echo $destination;
		$msg = $c -> upload($getText, $filename, $getLat, $getLng);////上传后返回该微博的信息
		if ($msg === false || $msg === null) {
			echo "Error occured";
			return false;
		}
		if (isset($msg['error_code']) && isset($msg['error'])) {
			echo('Error_code: ' . $msg['error_code'] . ';  Error: ' . $msg['error']);
			return false;
		}
		//上传后返回该微博的信息
		//echo($msg['id'] . " : " . $msg['text'] . " " . $msg["created_at"]);
	}
}
?>