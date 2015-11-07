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
	// 获取第N页 每页10个
	//$weibos_get = $c -> user_timeline_by_id($uid, $pageNumber, WB_WEIBO_PAGE_SIZE);
	//第6个参数：	0：全部、1：原创、2：图片、3：视频、4：音乐，默认为0。
	$weibos_get = $c -> user_timeline_by_id($uid, $pageNumber, WB_WEIBO_PAGE_SIZE,0,0,0,0,0);
	$totalWeibos = $weibos_get['total_number'];
	$totalPages = intval($totalWeibos / WB_WEIBO_PAGE_SIZE) + (($totalWeibos % WB_WEIBO_PAGE_SIZE) > 0 ? 1 : 0);

	$statues = $weibos_get['statuses'];
	$t = new MyUtils();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<link rel='stylesheet' type='text/css' href="pics/myCss.css" />
		<link rel='stylesheet' type='text/css' href="pics/CssForSelect.css" />
		<link rel='stylesheet' type='text/css' href="pics/CssForCheckBox.css" />
		<link rel='stylesheet' type='text/css' href="pics/GotoPageCss.css" />
		<link rel='stylesheet' type='text/css' href="pics/CssForSroll.css" />
		<!-- 引用topcoatCSS -->
		<!-- <link rel="stylesheet" type="text/css" href="Topcoat/css/topcoat-mobile-light.css">
		<link rel="stylesheet" type="text/css" href="Topcoat/css/normalize.css">
		<link rel="stylesheet" type="text/css" href="Topcoat/css/styleguide.css">
		<link rel="stylesheet" type="text/css" href="Topcoat/css/topcoat-desktop.css"> -->
		<!-- 站内应用引用新浪JS -->
		<script src="http://tjs.sjs.sinajs.cn/t35/apps/opent/js/frames/client.js"></script>
		<script type="text/javascript" src="scripts/jquery-latest.js"></script>
		<!-- 单个删除微博 -->
		<script src="scripts/AjaxDelWeibo.js"></script>
		<!-- 删除多选微博 -->
		<script src="scripts/delWeibosBatch.js"></script>
		<!-- 检测复选框状态 -->
		<script src="scripts/CheckBoxState.js"></script>
		<!-- 滚动条 -->
		<script src='scripts/AjaxAddMoreWeibo.js'></script>
		<!-- Ajax刷新微博 (翻页按钮用)-->
		<script src='scripts/refreshWeiboPage.js'></script>
		<!-- 当倒序复选框被选中或取消选中时刷新 -->
		<script src='scripts/clickBackSeq.js'></script>
		<!-- 监测微博类别radio的状态 -->
		<script src="scripts/checkWeiboType.js"></script>
		<!-- 自定义下拉列表 -->
		<script src="scripts/CustomSelectWeibo.js"></script>

		<!-- 引用icheck 只是改变了样式 input本身并未选中  该功能并未实现-->
		<!-- <link rel='stylesheet' type='text/css' href="iCheck/flat/red.css" />
		<script src="iCheck/jquery.icheck.js"></script>
		<script src="scripts/ForICheck.js"></script> -->

		<script type="text/javascript">
			function gotoSelectedPage() {
				var x = document.getElementById("navigatorForm");
				//alert("Original action: " + x.action)
				x.submit();
			}

			function weiboHover() {
				$(".aStatues").hover(function() {
					$(this).animate({
						height : '150px'
					}, 100);
				}, function() {
					$(this).animate({
						height : '60px'
					}, 100);
					//$(this).css("height","60px");
				});
			}


			$(document).ready(function() {
				//$('#delSeveral').attr({"disabled":true});//将按钮禁用
				//checkDelServal();//已进入页面本身就对checkbox检查一次  这样批量删除按钮就是金庸状态了

			});

		</script>
	</head>
	<body>
		<?php
		include_once ("navigationPage.php");
		?>

		<div id="pageSelectBGDiv">
			<div id="pageSelectformDiv" style="text-align: center; margin: 0 auto;"  >
				<form action="showWeibosBatch.php" method="get" id="navigatorForm" text-align="center">
					<div style="text-align: center;">
						<div class="linkSpan" style="display: inline-block">
							<a href="showWeibosBatch.php?pageNumber=1">首页</a>
						</div>
						<?php
						//if ($pageNumber > 1) {
						?>
						<div style="text-align: center;display: inline-block;line-height: 37px">
							<div class="nui-btn-icon" id="weiboPrePage" style="cursor: pointer">

								<!-- 原先使用的是页面跳转到的方式来刷新数据   -->
								<!-- <a href="showWeibosBatch.php?pageNumber=<?=($pageNumber - 1) ?>"> <img src="pics/preIcon.png"/> </a>
								-->
								<!-- 现在使用Ajax的方式来刷新数据 -->
								<!-- <input type="button" id="weiboPrePage" class="button orange" value="上一页"> -->
								<img src="pics/preIcon.png"/>
							</div>
						</div>
						<?

						//}
						?>

						<!--<select name="pageNumber" onchange="gotoSelectedPage();" class="iselect"> -->
						<div style="display:inline-block; vertical-align: middle;line-height: 37px;margin-bottom: 4px;">
							<select name="pageNumber" class="iselect" id="page_select">
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
//echo '<span class="linkSpan"><a href="showWeibosBatch.php?pageNumber=' . ($pageNumber + 1) . '">下一页</a></span>';
						?>
						<div style="display:inline-block;">
							<div class="nui-btn-icon" id="weiboNextPage" style="cursor: pointer">
							<!-- 原先使用的是页面跳转到的方式来刷新数据   -->
							<!--<a href="showWeibosBatch.php?pageNumber=<?=($pageNumber + 1) ?>"> <img src="pics/nextIcon.png"/> </a>
							 -->
							<!-- 现在使用Ajax的方式来刷新数据 -->
							<!-- <input type="button" id="weiboNextPage" class="button orange" value="下一页"> -->
							<img  src="pics/nextIcon.png"/>
							</div>
						</div>
						<?
						}
						echo '<div class="linkSpan" style="display:inline-block"><a href="showWeibosBatch.php?pageNumber=' . $totalPages . '">末页</a></div>';
						?>
					</div>
				</form>
			</div>
		</div>

		<div id="listDiv">
			<!-- 要实现批量删除   数据(要删除的id数组)应该放在form中提交 -->
			<form name="weibosForm" action="delWeibo.php" method="post">

				<div>
					<input type="hidden" name="pageNumber" id="pageNumber" value="1">
					<div style="padding: 10px;float: left;">
						<input type="checkbox" name="delAll" id="delAll" onclick="clickDelAll();">
					</div>
					<div style="float: left;">
						<input type="button" id="delSeveral" class="button orange" value="批量删除">
					</div>
					<div style="float: right; padding: 10px;">
						<input type="radio" name="weiboType" class="radioType" value="0" checked="checked" />全部 
						<input type="radio" name="weiboType" class="radioType" value="1" />原创 
						<input type="radio" name="weiboType" class="radioType" value="2" />图片
						<input id="backseq" type="checkbox" style="margin:5px;"/>倒序查看
					</div>
					<div style="clear:both"></div>
				</div>
				<!-- 这些微博item的div应该放在一个父div中 也就是weibolist 方便后来Ajax得到的weibo能够通过append的方式加入到原有微博后面 -->
				<div id="weibolist" style="height:800px; overflow-y:auto">
					<?php
// $i = 0;
foreach ($statues as $weibo) {

// $i = $i + 1;
// echo '<div style="background-color: #FDF5E6" class="aStatues" id="' . $weibo['idstr'] . '" >';
//
// //复选框
// echo '<div style="float:leftnnm; width:20px">';
// echo '<input type="checkbox" name="ids[]" value="' . $weibo['idstr'] . '" onclick="checkDelServal();" />';
// echo '</div>';
// $t = new MyUtils();
//
// //微博内容
// echo '<div id="aStatusContent" style="display:inline-block; width:650px;margin-left:10px">';
//
// //我的微博
// echo '<div style="height:auto">';
// //just my weibo text
// //显示缩略的微博内容
// $textSummary = $t -> textSummary($weibo['text']);
// echo '<div style="float:left;width:580px;">';
// echo $textSummary;
// echo '</div>';
//
// // 显示时间 根据我自定义的格式
// echo '<div style="float:right; height:18px;">';
// $param = $t -> getTime($weibo['created_at']);
// echo $param['year'] . '-' . $param['month'] . '-' . $param['date'];
// echo '</div>';
// echo '<div style="clear:both"></div>';
// //原本父div会包裹子div的 但是若子div使用了float属性  父div就不会随着子div变化而变化  解决方法是再加上一个没有float的子div
// echo '</div>';
// //my weibo ends
//
// //所转发的  OR 图片
// echo '<div>';
// // 图片
// if (!empty($weibo['thumbnail_pic'])) {
// echo '<div style="display:block;margin-left:50px;">';
// echo '<a target="view_window" href="' . $weibo['original_pic'] . '"><img src="' . $weibo['thumbnail_pic'] . '"/> </a>';
// echo '</div>';
// }
//
// //转发
// if (!empty($weibo['retweeted_status'])) {
// echo '<div style="margin-left:50px; background-color: #F0FFFF;">';
// echo '<div style="float:left">';
// $textSummary = $t -> textSummary($weibo['retweeted_status']['text']);
// echo $textSummary;
// echo '</div>';
// if (!empty($weibo['retweeted_status']['thumbnail_pic'])) {
// echo '<div style="display:block; ">';
// echo '<a target="view_window" href="' . $weibo['retweeted_status']['original_pic'] . '"><img src="' . $weibo['retweeted_status']['thumbnail_pic'] . '"/> </a>';
// echo '</div>';
// }
// echo '</div>';
// }
// echo '</div>';
// //转发 OR 图片结束
//
// echo '</div>';
// //微博内容结束
//
// // 删除
// //echo '<a href="delWeibo.php?id=' . $weibo ['idstr'] . '&&pageNumber=' . $pageNumber . '" style="float:right;" >删除</a>';
// echo '<div style=" float:right ">';
// echo '</div>';
//
// echo '</div>';

					?>
					<!-- 微博父框架 -->
					<div id="<?=$weibo['idstr'] ?>" style="overflow: hidden;padding:5px;0px;5px;0px;">
						<!-- 一条微博信息 -->
						<div  class="aStatues" style="">
							<!-- 为什么要这么做呢？ 这样可以将这整一条微博信息全部隐藏 而不会留下因为margin引起的空缺  以后块与块之间的间隔也不要用margin  应该再加一个div 用padding -->

							<!-- 复选框 -->
							<div style="float:left; width:30px;padding:5px">
								<input type="checkbox" name="ids[]" value="<?=$weibo['idstr'] ?>" onclick="checkDelServal();" />
							</div>

							<!-- 微博内容 -->
							<div id="aStatusContent" style="float:left; width:600px;margin-left:10px">
								<!-- 我的微博 -->
								<div style="height:auto">
									<!-- just my weibo text -->
									<!-- 显示缩略的微博内容 -->
									<?
									$textSummary = $t -> textSummary($weibo['text']);
									?>
									<div style="float:left;width:580px;">
										<?=$textSummary; ?>
									</div>

									<!-- 显示时间 根据我自定义的格式 -->
									<div style="float:right; height:18px;">
										<?
										$param = $t -> getTime($weibo['created_at']);
										echo $param['year'] . '-' . $param['month'] . '-' . $param['date'];
										?>
									</div><!-- 显示时间 ends -->

									<!-- 原本父div会包裹子div的 但是若子div使用了float属性  父div就不会随着子div变化而变化  解决方法是再加上一个没有float的子div -->
									<div style="clear:both"></div>
								</div>
								<!-- my weibo ends -->
								<!-- 所转发的内容  OR 图片 -->
								<div class="imgOrRepost">
									<!-- 图片 -->
									<?
									//早期  仅显示单张图片=======================
									/*if (!empty($weibo['thumbnail_pic'])) {
									 echo '<div style="display:block;margin-left:50px;">';
									 echo '<a target="view_window" href="' . $weibo['original_pic'] . '"><img src="' . $weibo['thumbnail_pic'] . '"/> </a>';
									 echo "</div>";
									 }*/
									//现在可以显示多张图片了
									if (!empty($weibo['pic_urls'])) {
										echo '<div id="thumbpic" style="display:block;margin-left:50px;">';
										$index = 0;
										foreach ($weibo['pic_urls'] as $v) {
											//echo '<img src="' . $weibo['pic_urls'][$index]['thumbnail_pic'] . '"/>';//ok
											echo '<a href="' . $v['original_pic'] . '" ><img src="' . $v['thumbnail_pic'] . '"/></a>';
											//ok
											$index++;
										}
										echo '</div>';
									}
									?>

									<!-- 转发 -->
									<?
									if (!empty($weibo['retweeted_status'])) {
										echo '<div id="retweeted" style="margin-left:50px; background-color: #F0FFFF;">';
										//原微博文字
										//echo '<div style="float:left">';
										echo '<div style="">';
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
											echo '<div style="display:block; ">';
											foreach ($weibo['retweeted_status']['pic_urls'] as $v) {
												echo '<img src="' . $v['thumbnail_pic'] . '"/>';
											}
											echo '</div>';
										}
										echo '</div>';
									}
									echo '</div>';
									?>
									<!-- 转发 OR 图片结束 -->

								</div>
								<!-- 微博内容结束 -->

								<!-- 删除 -->
								<div style=" float:right;padding:5px;">
									<input type="button" id="delButton" name="<?=$weibo['idstr'] ?>" onclick="toDel(this);" value="" >
									</button>
								</div>
								<?
								//echo '<a href="delWeibo.php?id=' . $weibo['idstr'] . '&&pageNumber=' . $pageNumber . '" style="float:right;" >删除</a>';
								?>
							</div><!-- 一条微博结束 -->
						</div><!-- 微博父框架 -->

						<?
						}
						?>
					</div>
			</form>
		</div>
		<span id="msg"></span>
	</body>
</html>