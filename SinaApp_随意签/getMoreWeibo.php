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

	//倒序查看
	$backseq;
	if (!empty($_REQUEST["backseq"])) {
		$backseq = (int)$_REQUEST["backseq"];
	} else {
		$backseq = 0;
	}
	
	//微博类型
	$weiboType;
	if (!empty($_REQUEST["weiboType"])) {
		$weiboType = (int)$_REQUEST["weiboType"];
	} else {
		$weiboType = 0;
	}

	// 获取第N页 每页10个
	//$weibos_get = $c -> user_timeline_by_id($uid, $pageNumber, WB_WEIBO_PAGE_SIZE);
	$weibos_get = $c -> user_timeline_by_id($uid, $pageNumber, WB_WEIBO_PAGE_SIZE,0,0,$weiboType,0,0);
	$totalWeibos = $weibos_get['total_number'];
	$totalPages = intval($totalWeibos / WB_WEIBO_PAGE_SIZE) + (($totalWeibos % WB_WEIBO_PAGE_SIZE) > 0 ? 1 : 0);
	
	if ($backseq == 0) {
	} else {

		//获取逆向数的第N页  每页10个
		$weibos_get = $c -> user_timeline_by_id($uid,$totalPages+1-$pageNumber, WB_WEIBO_PAGE_SIZE);
	}

	$statues = $weibos_get['statuses'];
	//$t = new MyUtils();
	//echo $statues;//echo 出来时Array 看不到实际信息

	foreach ($statues as $weibo) {
		//微博父框架
		echo '<div id="' . $weibo['idstr'] . '"  style="overflow: hidden;padding:5px;0px;5px;0px;" >';
		//一条微博信息
		echo '<div class="aStatues">';

		//复选框
		echo '<div style="float:left;width:30px;padding:5px;">';
		echo '<input type="checkbox" name="ids[]" value="' . $weibo['idstr'] . '" onclick="checkDelServal();" />';
		echo '</div>';
		$t = new MyUtils();

		//微博内容
		echo '<div id="aStatusContent" style="float:left; width:600px;margin-left:10px">';

		//我的微博
		echo '<div id="mytextDiv" style="height:auto">';
		//just my weibo text
		//显示缩略的微博内容
		$textSummary = $t -> textSummary($weibo['text']);
		echo '<div style="display:inline-block;width:580px;">';
		echo $textSummary;
		echo '</div>';

		// 显示时间 根据我自定义的格式
		echo '<div style="float:right; height:18px;">';
		$param = $t -> getTime($weibo['created_at']);
		echo $param['year'] . '-' . $param['month'] . '-' . $param['date'];
		echo '</div>';
		echo '<div style="clear:both"></div>';
		//原本父div会包裹子div的 但是若子div使用了float属性  父div就不会随着子div变化而变化  解决方法是再加上一个没有float的子div
		echo '</div>';
		//my weibo ends

		echo '<!--  所转发的  OR 图片  --><div class="img OR retweet">';
		// 图片
		//早期  仅显示单张图片=======================
		/*if (!empty($weibo['thumbnail_pic'])) {
		 echo '<div style="display:block;margin-left:50px;">';
		 echo '<a target="view_window" href="' . $weibo['original_pic'] . '"><img src="' . $weibo['thumbnail_pic'] . '"/> </a>';
		 echo "</div>";
		 }*/
		//现在可以显示多张图片了
		if (!empty($weibo['pic_urls'])) {
			echo '<div id="thumbPicDiv" style="display:block;margin-left:50px;">';
			$index = 0;
			foreach ($weibo['pic_urls'] as $v) {
				//echo '<img src="' . $weibo['pic_urls'][$index]['thumbnail_pic'] . '"/>';//ok
				echo '<a href="' . $v['original_pic'] . '" ><img src="' . $v['thumbnail_pic'] . '"/></a>';
				//ok
				$index++;
			}
			echo '</div>';
		}

		echo '<!-- 转发div -->';
		if (!empty($weibo['retweeted_status'])) {
			echo '<div id="retweetedDiv" style="margin-left:50px; background-color: #F0FFFF;">';
			echo '<div id="reText" style="display:inline-block">';
			$textSummary = $t -> textSummary($weibo['retweeted_status']['text']);
			echo $textSummary;
			echo '</div>';
			//早期图片 只显示第一张
			/*if (!empty($weibo['retweeted_status']['thumbnail_pic'])) {
			 echo '<div style="display:block; ">';
			 echo '<a target="view_window" href="' . $weibo['retweeted_status']['original_pic'] . '"><img src="' . $weibo['retweeted_status']['thumbnail_pic'] . '"/> </a>';
			 echo '</div>';
			 }*/
			//显示图片
			if (!empty($weibo['retweeted_status']['pic_urls'])) {
				echo '<div id="thumbPicDiv" style="display:block; ">';
				foreach ($weibo['retweeted_status']['pic_urls'] as $v) {
					echo '<img src="' . $v['thumbnail_pic'] . '"/>';
				}
				echo '</div>';
			}
			echo '</div>';
		}

		echo '</div></div><!-- 微博内容结束 -->';

		//echo '<a href="delWeibo.php?id=' . $weibo ['idstr'] . '&&pageNumber=' . $pageNumber . '" style="float:right;" >删除</a>';
		echo '<!-- 删除DIV -->';
		echo '<div id="delBtnDiv" style=" float:right;padding:5px;">';
		echo '<input type="button" id="delButton" name="' . $weibo['idstr'] . '" onclick="toDel(this);" value="" ></button>';
		echo '</div>';

		echo '</div><!--  一条微博结束  -->';
		echo '</div><!--  微博父框架  -->';
	}

}
?>