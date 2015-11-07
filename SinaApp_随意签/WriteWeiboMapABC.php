<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel='stylesheet' type='text/css' href="pics/myCss.css" />
		<link rel='stylesheet' type='text/css' href="pics/writeWeibo.css" />
		<script src="scripts/jquery-latest.js"></script>
		<script src="scripts/jquery.color.min.js"></script>
		<script src="scripts/jquery.form.js"></script>
		<!-- AJax上传 -->
		<script src="scripts/ForAjaxForm.js"></script>
		<!-- 字数控制 -->
		<script src="scripts/countWords.js"></script>

		<!--	地图控制-->
		<script language="javascript" src="http://app.mapabc.com/apis?t=javascriptmap&v=3.1.1&key=b0a7db0b3a30f944a21c3682064dc70ef5b738b062f6479a5eca39725798b1ee300bd8d5de3a4ae3"></script>
		<script	type = "text/javascript" src="scripts/initMapABC.js"></script>
		<style type="text/css">

		</style>


	</head>

	<body>
		<div>
			<?php
			include_once ("navigationPage.php");
			?>
			<div style="padding: 10px;">
				<div id="inputDiv" style="">
					<form id="formWrite"  method="post"  enctype="multipart/form-data">
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
							<div id="Tip"></div>
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
				<div style=" height: 660px;" id="map" ></div>
				<div id="msg"></div>
			</div>
		</div>
	</body>
	<script>

	</script>

</html>