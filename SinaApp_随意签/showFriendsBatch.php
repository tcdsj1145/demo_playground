<?php
session_start();
include_once ('config.php');
include_once ('saetv2.ex.class.php');

if (empty($_SESSION['oauth2']["user_id"])) {// 若没有获取到access token，则发起授权请求
	include "auth.php";
	exit();
} else {
	// echo "uid ".$_SESSION['oauth2']["user_id"];//ok
	// echo "ac ".$_SESSION['oauth2']["oauth_token"];//ok

	$c = new SaeTClientV2(WB_AKEY, WB_SKEY, $_SESSION['oauth2']['oauth_token'], '');
	$uid = $_SESSION['oauth2']["user_id"];
	// 比下面的额方法更直接
	// $uid_get=$c->get_uid();
	// $uid=$uid_get['uid'];
	if (!empty($_REQUEST["pageNumber"])) {
		$pageNumber = $_REQUEST["pageNumber"];
		// request必须是大写
	} else {
		$pageNumber = 1;
	}

	$cursor = ($pageNumber - 1) * WB_USER_PAGE_SIZE;
	$friends_get = $c -> friends_by_id($uid, $cursor, WB_USER_PAGE_SIZE);
	$totalFriends = $friends_get['total_number'];
	// 计算得出的总页数
	$totalPages = intval($totalFriends / WB_USER_PAGE_SIZE) + (($totalFriends % WB_USER_PAGE_SIZE) > 0 ? 1 : 0);
	$friends = $friends_get['users'];

	// echo 'pageNo ' . $pageNumber;
	// echo 'totalF' . $totalFriends;
	// echo 'total ' . $totalPages;
}
?>
<html>
	<head>
		<link rel='stylesheet' type='text/css' href="pics/myCss.css" />
		<link rel='stylesheet' type='text/css' href="pics/CssForSelect.css" />
		<link rel='stylesheet' type='text/css' href="pics/CssForCheckBox.css" />
		<link rel='stylesheet' type='text/css' href="pics/GotoPageCss.css" />
		<link rel='stylesheet' type='text/css' href="pics/CssForSroll.css" />
		<!-- 站内应用引用新浪JS-->
		<script src="http://tjs.sjs.sinajs.cn/t35/apps/opent/js/frames/client.js"></script>
		<script type="text/javascript" src="scripts/jquery-latest.js"></script>
		<!-- 滚动条 -->
		<script src="scripts/AjaxAddMoreFriend.js"></script>
		<!-- 单个删除 -->
		<script src="scripts/AjaxDelFriend.js"></script>
		<!-- 复选框状态 -->
		<script src="scripts/CheckBoxState.js"></script>
		<!-- 自定义下拉列表 -->
		<script src="scripts/ForCustomSelect.js"></script>
		<script type="text/javascript">
			function gotoSelectedPage() {
				var x = document.getElementById("navigatorForm");
				//alert("Original action: " + x.action);
				x.submit();
			}



			$(document).ready(function() {
				/*$(".aUser").hover(function() {
					$(this).animate({
						height : "100px"
					}, 100);
				}, function() {
					$(this).animate({
						height : "40px"
					}, 100);
				});*/

			});

		</script>
	</head>

	<body>
		<?php
		include_once ("navigationPage.php");
		?>
		<div id="pageSelectBGDiv">
			<div id="pageSelectformDiv" style="text-align: center; margin: 0 auto;">
				<form action="showFriendsBatch.php" method="get" id="navigatorForm" text-align="center">
					<div style="text-align: center;">
						<span class="linkSpan"><a href="showFriendsBatch.php?pageNumber=1">首页</a></span>
						<?php
if ($pageNumber > 1) {
//echo '<span class="linkSpan"><a href="showFriendsBatch.php?pageNumber=' . ($pageNumber - 1) . '">上一页</a></span>';
						?>
						<div style="text-align: center;display: inline-block;line-height: 37px">
							<div class="nui-btn-icon">
								<a href="showFriendsBatch.php?pageNumber=<?=($pageNumber - 1) ?>"> <img src="pics/preIcon.png"/> </a>
							</div>
						</div>
						<?

						}

						//printf('%s', '去往');
						?>

						<div style="display:inline-block; vertical-align: middle;line-height: 37px;margin-bottom: 4px;">
							<select name="pageNumber" class="iselect">
								<?php
								for ($i = 1; $i <= $totalPages; $i++) {
									if ($i == $pageNumber) {
										echo '<option value="' . $i . '" selected="selected">' . $i . '</option>';
									} else {
										echo '<option value="' . $i . '">' . $i . '</option>';
									}
								}
								?>
							</select>
						</div>
						<?php
//printf('%s', '页');

if ($pageNumber < $totalPages) {
//echo '<span class="linkSpan"><a href="showFriendsBatch.php?pageNumber=' . ($pageNumber + 1) . '">下一页</a></span>';
						?>
						<div style="display:inline-block;">
							<div class="nui-btn-icon">
								<a href="showFriendsBatch.php?pageNumber=<?=($pageNumber + 1) ?>"> <img src="pics/nextIcon.png"/> </a>
							</div>
						</div>
						<?
						}
						echo '<span class="linkSpan"><a href="showFriendsBatch.php?pageNumber=' . ${totalPages} . '">末页</a></span>';
						?>
					</div>
				</form>
			</div>
		</div>

		<div id="listDiv">
			<!-- 要实现批量删除   数据(要删除的id数组)应该放在form中提交 -->
			<form action="delFriend.php" method="post">
				<div>
					全选
					<input type="hidden" name="pageNumber" value="<?php echo $pageNumber; ?>">
					<div style="display: inline-block;padding: 5px;">
						<input type="checkbox" name="delAll" id="delAll" onclick="clickDelAll();" />
					</div>
					<input type="submit" id="delSeveral" class="button orange" value="批量删除">
				</div>
				<div id="friendlist" style="height:800px; overflow-y:auto">
					<?php
$i = 0;
foreach ( $friends as $user ) {
//	$i = $i + 1;
//	if ($i % 2 == 0) { // 使得相隔微博使用不同的配色
// echo '<div style="background-color: #FDF5E6" id="' . $user ['id'] . '" class="aUser">';
//	} else {
//		echo '<div style="background-color: #F5F5DC" id="' . $user ['id'] . '" class="aUser">';
//	}
// //复选框
// echo '<div style="float:left;width:20px;">';
// echo '<input type="checkbox" name="ids[]" value="' . $user ['id'] . '" onclick="checkDelServal();" />';
// echo '</div>';

// // 用户
// echo '<div style="display:inline-block">';
// //图片
// echo '<div style="display:inline-block">';
// if (! empty ( $user ['profile_image_url'] )) {
// echo '<a target="view_window" href="http://weibo.com/u/' . $user ['id'] . '"><img src="' . $user ['profile_image_url'] . '"/></a>';
// }
// echo '</div>';
//用户文字信息
// echo '<div style="display:inline-block;width:620px">';
// //名字和介绍
// echo '<div>';
// echo $user ['screen_name'] . " :  " . $user ['description'];
// echo '</div>';

//粉丝数 关注数
// echo '<div style="padding:3px">';
// if ($user ['follow_me']) {
// echo '<span class="isFans">';
// printf ( '%s', '<font color="white" >我的粉丝</font>' );
// echo '</span>';
// }else{
// echo '<span class="notFans">';
// printf ( '%s', '我的粉丝' );
// echo '</span>';
// }
// echo '微博数: '.$user['statuses_count'].' 粉丝数: '.$user['followers_count'].' 关注数:'.$user['friends_count'];
// echo '</div>';
?>
<div id="<?=$user['id'] ?>" style="padding: 5px;">
<div style=""  class="aUser">
					<!-- 复选框 -->
					<div style="float:left;width:30px;padding:5px;">
					<input type="checkbox" name="ids[]" value="<?=$user['id'] ?>" onclick="checkDelServal();" />
					</div>
					<!-- 用户信息 -->
					<div style="display:inline-block;width: 600px;">
					<!-- 头像 -->
					<div style="float:left;">
					<?
					if (!empty($user['profile_image_url'])) {
						echo '<a target="view_window" href="http://weibo.com/u/' . $user['id'] . '"><img src="' . $user['profile_image_url'] . '"/></a>';
					}
					?>
					</div>
					<!-- 用户文字信息 -->
					<div style="display:inline-block;max-width: 530px;">
					<!-- 名字和介绍 -->
					<div style="padding-left: 5px;">
					<?=$user['screen_name'] ?>:
					<?=$user['description'] ?>
					</div>
					<!-- 最近一条微博 -->
					<div>
					<?=$user['status']['created_at'] ?>
					</div>
					<!-- 粉丝数 关注数 	 -->
					<div style="padding:3px">
					<?
					if ($user['follow_me']) {
						echo '<span class="isFans">';
						printf('%s', '<font color="white" >我的粉丝</font>');
						echo '</span>';
					} else {
						echo '<span class="notFans">';
						printf('%s', '我的粉丝');
						echo '</span>';
					}
					?>
					微博数: <?=$user['statuses_count'] ?>
					粉丝数: <?=$user['followers_count'] ?>
					关注数: <?=$user['friends_count'] ?>
					</div>
					</div>			<!-- 用户文字信息结束 -->
					</div>      <!-- 用户DIV结束 -->
					<!-- 删除DIV -->
					<div style="float:right">
					<input type="button" id="delButton" name="<?=$user['id'] ?>" onclick="toDel(this);" value=""></button>
					</div><!--del-->
					</div><!--用户DIV结束-->
					</div><!-- 父框架结束 -->
					<!-- 一条关注信息结束 -->
					<?
					}
					?>
					</div>
			</form>
		</div>
		<span id="msg"></span>
	</body>
</html>