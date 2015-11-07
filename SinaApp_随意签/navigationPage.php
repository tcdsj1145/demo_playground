<?php ?>
<html xmlns:wb="http://open.weibo.com/wb">
	<head>
		<style type="text/css">
			#navP {
				width:744px;
				margin-top:-40px;
				padding-top: 5px;
				/*background: #f1f1f1;
				background: -webkit-gradient(radial,100 36,0,100 -40,120,from(#fafafa),to(#f1f1f1)), #f1f1f1;
				background-image:url(pics/header_bg.png);
				background-repeat:repeat;
				border-bottom: 1px solid #666;
				border-color: #e5e5e5;*/
			}
			.topnav {
				border: 5px solid;
				height: 38px;
				border-color: orange;
				background-color: rgb(245, 245, 220);
				/*圆角*/
				-moz-border-radius: 10px;
				-webkit-border-radius: 30px;
				border-radius: 30px;
				display: inline;
				/*width: 400px;*/
				float: left;
				padding-left: 20px;
				padding-right: 20px;
				margin-bottom: 5px;
				margin-top:5px;
			}

			#nav ul {
				height: 38px;
				padding: 0 0 0 0;
				margin: 0 0 0 0;
				white-space: nowrap;
				font-size: 16pt;
				color: rgb(245, 245, 220);
				float: left;
				width: 100%;
				list-style: none;
			}

			#nav ul li {
				display: inline;
				list-style: none;
			}

			#nav ul li a {
				margin: 0 0 0 0;
				padding: .25em 2em .3em 1em;
				color: #000000;
				text-decoration: none;
				float: left;
				border-right: 1px solid #cccccc;
			}

			#nav ul li a:hover {
				background: #8DA8D5;
				color: #ffffff;
				text-decoration: none;
				border-right: 1px solid #cccccc;
			}
		</style>
		<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1459489213" type="text/javascript" charset="utf-8"></script>
	</head>
	<div style="" id="navP">
		<div style="float: right;margin: 5px;width:72px;">
			<wb:share-button title="这个应用很有意思的,大家来试试吧"></wb:share-button>
		</div>
		<div style="float: right;">
			<wb:publish>
				<a class="publishButton publishButton_red02" href="javascript:;"><span>发布到微博</span></a>
			</wb:publish>
		</div>
		<div class="topnav" id="nav">
			<ul>
				<li>
					<a href="showWeibosBatch.php?pageNumber=1">删微博</a>
				</li>
				<li>
					<a href="showFriendsBatch.php?pageNumber=1">取消关注</a>
				</li>
				<li>
					<a href="WriteWeiboMapABC.php">随意签</a>
				</li>
			</ul>
		</div>
		<div style="clear:both"></div>
	</div>
</html>