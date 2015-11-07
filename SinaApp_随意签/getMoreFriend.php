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

	if (!empty($_REQUEST["pageNumber"])) {
		$pageNumber = $_REQUEST["pageNumber"];
		// request必须是大写
	} else {
		$pageNumber = 1;
	}
	$cursor = ($pageNumber-1) * WB_USER_PAGE_SIZE;
	$friends_get = $c -> friends_by_id($uid, $cursor, WB_USER_PAGE_SIZE);
	$totalFriends = $friends_get['total_number'];
	$friends = $friends_get['users'];

	foreach ($friends as $user) {
		echo '<!--父框架--><div id="' . $user['id'] . '" style="padding:5px;" >';
		echo '<div style="" class="aUser">';
		echo '<!-- 复选框 -->';
		echo '<div style="float:left;width:30px;padding:5px;">';
		echo '<input type="checkbox" name="ids[]" value="' . $user['id'] . '" onclick="checkDelServal();" />';
		echo '</div>';
		echo '<!-- 用户信息 -->';
		echo '<div style="display:inline-block">';
		echo '<!-- 头像 -->';
		echo '<div style="float:left;">';
		if (!empty($user['profile_image_url'])) {
			echo '<a target="view_window" href="http://weibo.com/u/' . $user['id'] . '"><img src="' . $user['profile_image_url'] . '"/></a>';
		}
		echo '</div><!-- 头像结束 -->';
		echo '<!--用户文字信息-->';
		echo '<div style="display:inline-block;max-width:530px">';
		echo '<!--名字和介绍-->';
		echo '<div style="padding-left: 5px;">';
		echo $user['screen_name'] . " :  " . $user['description'];
		echo '</div>';
		echo '<!-- 最近一条微博 -->';
		echo '<div>';
		echo $user['status']['created_at'];
		echo '</div>';
		echo "<!--粉丝数 关注数 -->";
		echo '<div style="padding:3px">';
		if ($user['follow_me']) {
			echo '<span class="isFans">';
			printf('%s', '<font color="white" >我的粉丝</font>');
			echo '</span>';
		} else {
			echo '<span class="notFans">';
			printf('%s', '我的粉丝');
			echo '</span>';
		}
		echo '微博数: ' . $user['statuses_count'] . ' 粉丝数: ' . $user['followers_count'] . ' 关注数:' . $user['friends_count'];
		echo '</div>';
		echo '</div><!-- 用户文字信息结束 -->';
		echo '</div>      <!-- 用户DIV结束 -->';
		echo '<!-- 删除DIV -->';
		echo '<div style="float:right">';
		echo '<input type="button" id="delButton" name="'.$user['id'].'" onclick="toDel(this);" value=""></button>';
		echo '</div>';
		echo '</div><!-- 一条关注信息结束 -->';
		echo '</div><!--父框架结束-->';
	}

}
