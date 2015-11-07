/*地图控制============================================================*/
$(document).ready(function() {
	initMap();
});
var maplet = null;
function initMap() {
	var opt = {
		level : 13, //初始地图视野级别
		center : new MMap.LngLat(116.397428, 39.90923), //设置地图中心点
		doubleClickZoom : true, //双击放大地图
		scrollWheel : true//鼠标滚轮缩放地图
	}
	mapObj = new MMap.Map("map", opt);
	mapObj.plugin(["MMap.ToolBar", "MMap.OverView", "MMap.Scale"], function() {
		toolbar = new MMap.ToolBar();
		toolbar.autoPosition = false;
		//加载工具条
		mapObj.addControl(toolbar);
		overview = new MMap.OverView();
		//加载鹰眼
		mapObj.addControl(overview);
		scale = new MMap.Scale();
		//加载比例尺
		mapObj.addControl(scale);
	});

	mapObj.bind(mapObj, "click", function(e) {
		//document.getElementById("mapX").value=e.lnglat.lng;
		//document.getElementById("mapY").value=e.lnglat.lat;
		//alert("经度：" + e.lnglat.lng + "\n纬度：" + e.lnglat.lat);
		$('#geolatInput').val(e.lnglat.lat);
		$('#geolongInput').val(e.lnglat.lng);
		$('#geolat').html(e.lnglat.lat);
		$('#geolng').html(e.lnglat.lng);
	});
}