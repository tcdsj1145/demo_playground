<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel='stylesheet' type='text/css' href="pics/myCss.css" />
		<style type="text/css">
			html {
				height: 100%
			}

			#map_canvas {
				height: 100%
			}
			#map {
				min-height: 500px;
				width: 100%
			}
			/*微博发布器 按钮===========================================*/
			.faWeibo {
				font-family: Arial;
				color: #ffffff;
				font-size: 16px;
				padding: 10px;
				text-decoration: none;
				-webkit-border-radius: 28px;
				-moz-border-radius: 28px;
				border-radius: 28px;
				-webkit-box-shadow: 0px 1px 3px #666666;
				-moz-box-shadow: 0px 1px 3px #666666;
				box-shadow: 0px 1px 3px #666666;
				text-shadow: 1px 1px 3px #666666;
				border: solid #400a22 2px;
				background: -webkit-gradient(linear, 0 0, 0 100%, from(#f50e0e),
				to(#faa05f) );
				background: -moz-linear-gradient(top, #f50e0e, #faa05f);
				-ms-filter: progid :     DXImageTransform.Microsoft.gradient (
				startColorStr =     #f50e0e, endColorStr =     #faa05f );
				filter: progid :     DXImageTransform.Microsoft.gradient (
				startColorStr =
				#f50e0e, endColorStr =     #faa05f );
				display: inline-block; /* IE is so silly */
			}

			.faWeibo:hover {
				background: #ff0000;
			}

			.uploadDiv {
				/*圆角*/
				-moz-border-radius: 30px;
				-webkit-border-radius: 30px;
				border-radius: 30px;
				/*阴影*/
				-webkit-box-shadow: 0px 1px 3px #666666;
				-moz-box-shadow: 0px 1px 3px #666666;
				box-shadow: 0px 1px 3px #666666;
				width: 45px;
				height: 45px;
				overflow: hidden;
				position: relative;
				/*margin: 5px auto;*/
				background: url(pics/upload4545.png);
			}
			.upload-input {
				opacity: 0;
				filter: alpha(opacity=0);
				height: 50px;
				position: absolute;
				top: 0;
				right: 0;
				cursor: pointer;
				font-size: 26px;
			}

			.titleArea {
				/*圆角*/
				-moz-border-radius: 30px;
				-webkit-border-radius: 30px;
				border-radius: 30px;
				/*textArea样式  来自于微博	*/
				margin: 1px 0px 0px;
				padding: 15px;
				/*border-style: none;*/
				border-width: 3px;
				border-color: orange;
				font-size: 14px;
				font-family: Tahoma, 宋体;
				word-wrap: break-word;
				line-height: 18px;
				overflow-y: auto;
				overflow-x: hidden;
				outline: none;
				resize: none;
			}

		</style>
		<script src="scripts/jquery-latest.js"></script>
		<script src="scripts/jquery.color.min.js"></script>
	</head>

	<body>
		<?php
		include_once ("navigationPage.php");
		?>
		<div id="inputDiv" style="margin-top:10px; padding: 10px;border-top-left-radius: 30px;
		border-top-right-radius: 30px;background-color: #EEEEEE;
		background: -webkit-gradient(radial,100 36,0,100 -40,120,from(#fafafa),to(#f1f1f1)),#f1f1f1;
		border-bottom: 10px solid #666;
		border-color: #e5e5e5;">
			<form action="faWeibo.php" enctype="multipart/form-data" method="post">
				<div id="textAreaDiv" style="text-align:center">
					<div style="float: left" class="uploadDiv">
						<input type="file" id="image" value="选一个图片" name="upfile" class="upload-input">
					</div>
					<div style="display:inline;">
						<textarea id="textArea" class="titleArea" id="status" name="weiboText" rows="5" cols="80"></textarea>
					</div>
					<div style="float:right;">
						<input type="submit" class="faWeibo" value="签到">
					</div>
					<div style="clear:both"></div>

				</div>
				<div id="textMoreOpDiv" style="height:45px">

					<div>
						<input id="geolatInput" name="geolat" type="hidden">
						<!-- 处理后的地理信息 -->
						<input id="geolongInput" name="geolong" type="hidden">
						<input id="infoMsg" type="hidden">
						<!-- 最原始的地理信息-->
					</div>
					<div style="float: left;padding-top: 20px;font-family: Georgia;font-style: italic;">
						<span id="geolat" style="margin-left: 50px;margin-right: 50px;"></span>
						<span id="geolng"></span>
					</div>

					<div style="float:right;padding-top:20px;">
						发言请遵守社区公约，您还可以输入<span class="titleWordNum" style="font-family: Georgia;font-size: 16"> 140</span>字

					</div>
				</div>
			</form>
		</div>

		<div style="float: left; width: 100%; height: 660px;" id="map"></div>
		<div id="msg"></div>
	</body>
	<script type="text/javascript">
		/*字数控制=========================================================*/
		$('.titleArea').keyup(function() {
			//alert('123');
			//var hidTitleWordNum = parseInt($('.hidTitleWordNum').val());
			var hidTitleWordNum = 280;
			var titleAreaVal = $('.titleArea').val();

			var sum = 0;
			for (var i = 0; i < titleAreaVal.length; i++) {
				if ((titleAreaVal.charCodeAt(i) >= 0) && (titleAreaVal.charCodeAt(i) <= 255)) {
					sum = sum + 1;
				} else {
					sum = sum + 2;
				}
				if (sum > hidTitleWordNum) {
					//alert("输入数据超长！不能再输入数据。");
					/*$('.titleArea').css({
					 "background-color" : "#FA8072"
					 });*/
					$('.titleArea').css({
						"background-color" : "#FA8072"
					});
					$(".titleArea").animate({
						backgroundColor : "#FFFFF"
					}, 500);
					//舍弃该效果 现在有了更好的
					/*setTimeout(function(){
					$('#textAreaDiv').css({
					"background-color":"#FFFFFF"
					});
					},2000);*/
					//$('#textAreaDiv').fadeTo("slow", 0.0);//这样不行 连同整个输入框都消失了
					var str = titleAreaVal.substring(0, i);
					$('.titleArea').val(str);
					$('.titleWordNum').html(0);
					break;
				} else {
					$('.titleWordNum').html(Math.floor((hidTitleWordNum - sum) / 2));

				}
			}
		});
	</script>
	
	<script type="text/javascript" src="http://union.mapbar.com/apis/maps/free?f=mapi&v=31.3&k=aCW9cItqL7ArcCMpd7QuTh1pT70oLyTsNeP6NzThMHTsM7P8MIcrMBDrMyT=@qdIc97sTD6@tNIo9zpy77uH70qcyy9hMNCcHDW7uMW0WtpTDI9c0MTpcdI9Pz0BFJF="></script>
	<script	type = "text/javascript" >
		/*地图控制============================================================*/
		$(document).ready(function() {
			initMap();
		});
		var maplet = null;
		function initMap() {
			maplet = new Maplet("map");
			//输入参数使用明文或密文均可。
			maplet.centerAndZoom(new MPoint(116.36006, 39.93243), 8);
			maplet.showOverview(false, false);
			MEvent.addListener(maplet, "bookmark", bookmark_done);
			maplet.setMode("bookmark");
		}

		function bookmark_done(data) {
			alert("经度：" + data.point.lon + "\n纬度：" + data.point.lat);
			maplet.setMode("bookmark");
			$('#geolatInput').val(data.point.lat);
			$('#geolongInput').val(data.point.lon);
			$('#geolat').html(data.point.lat);
			$('#geolng').html(data.point.lon);
		}
	</script>

</html>