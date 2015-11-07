var rootUrl = "http://union.mapbar.com/apidoc";
//返回页面顶部
var _ie = false;
if (navigator.userAgent.toLowerCase().match(new RegExp("msie ([\\d.]+)"))) {
    _ie = true;
}
function goTop() {
    if(window.parent!=undefined)window.parent.window.scrollTo(0, 0);
	window.scrollTo(0, 0);
	//window.location.hash = "";
}

function bindEvent(objDom, eventName, objFun) {
	if (window.attachEvent) {
		objDom.attachEvent("on" + eventName, objFun);
	} else {
		objDom.addEventListener(eventName, objFun, false);
	}
}
function resizeIframe(){

    var left = $("#leftBox").width();
    $("#headerFrame").width($("body").width()-left-140);
    $("#headerFrame").height(window["headerFrame"].document.body.scrollHeight+60);
}


function switchUrl(url) {
    
    var hr = url.replace("http://union.mapbar.com/apidoc/", "");
    hr = hr.split(".html")[0];
    var s = hr.split("/");
    if(s[0] == "mapapi"){
        if(searchRedirect){
            
            $(".onA").removeClass("onA");
            if(hr.indexOf("demolist")>=0||hr.indexOf("examples")>=0){
                $("#_mapapi_demolist").addClass("onA");
            }else{
                $("#_mapapi_api-refrence").addClass("onA");
            }
            searchRedirect = false;
            return;
        }
    }else if(s[0] == "flashapi"){
        if(searchRedirect){
            $(".onA").removeClass("onA");
            if(hr.indexOf("demolist")>=0||hr.indexOf("examples")>=0){
                $("#_flashapi_demolist").addClass("onA");
            }else{
                $("#_flashapi_api-refrence").addClass("onA");
            }
            searchRedirect = false;
            return;
        }
    }else if((s[0] == "searchapi")){
        if(searchRedirect){
            $(".onA").removeClass("onA");
            if(hr.indexOf("demolist")>=0||hr.indexOf("examples")>=0){
                $("#_searchapi_demolist").addClass("onA");
            }else{
                $("#_searchapi_api-refrence").addClass("onA");
            }
            searchRedirect = false;
            return;
        }
    }
    hr = hr.replace("/", "_");

    if ($("#_" + hr).length == 0)return;
    if ($(".onA").length != 0) {
        if ($(".onA")[0].id == $("#_" + hr).attr("id"))return;
        $(".onA").removeClass("onA");
    }
    if(hr == "key" || hr == "yourkey"){
        $("#_key").addClass("onA").blur();
        $("#_yourkey").addClass("onA").blur();
    }else{
        $("#_" + hr).addClass("onA").blur();
    }
}
function menuTo(dtype,anchorName){
	var DT_WELCOME = 1; //首页
	var DT_MAP_DEMO = 2; //地图API示例
	var DT_MAP_API = 3; //地图API参考
	var DT_BASE = 4; //开发指南->基础
	var DT_CONTROL = 5; //开发指南->控件
	var DT_EVENT = 6; //开发指南->事件
	var DT_OVERLAY = 7; //开发指南->叠加物
	var DT_SERVICE = 8; //开发指南->服务
	var DT_GUIDE = 9; //开发指南
	var DT_API_KEY = 10; //API密钥概念及申请
	var DT_FEEDBACK = 11; //问题反馈
	var DT_VERSION = 12; //版本更新历史
	var DT_SAPI_GUIDE = 13; //搜索API开发指南
	var DT_SAPI_DEMO = 14; //搜索API示例
	var DT_SAPI_API = 15; //搜索API类参考
	var DT_KEY_RESULT = 16; //您的API密钥
	var DT_TERMS = 17; //使用条款
	var DT_VIP = 18; //高级用户服务
	var DT_ASS_LATLON = 19; //辅助工具->获取经纬度
	var DT_ASS_CONVERT = 20; //辅助工具->转换经纬度

	var pageName = "welcome";
	switch(dtype){
        case DT_WELCOME:
			pageName = "/welcome";
			break;
		case DT_MAP_API:
			pageName = "api-refrence";
			break;
		case DT_MAP_DEMO:
			pageName = "demolist";
			break;
		case DT_BASE:
			pageName = "base";
			break;
		case DT_CONTROL:
			pageName = "control";
			break;
		case DT_EVENT:
			pageName = "event";
			break;
		case DT_OVERLAY:
			pageName = "overlay";
			break;
		case DT_SERVICE:
			pageName = "service";
			break;
		case DT_GUIDE:
			pageName = "/mapapi/guide";
			break;
		case DT_API_KEY:
			pageName = "/key";
			break;
		case DT_FEEDBACK:
			pageName = "/feedback";
			break;
		case DT_VERSION:
			pageName = "/version";
			break;
		case DT_SAPI_GUIDE:
			pageName = "/searchapi/guide";
			break;
		case DT_SAPI_DEMO:
			pageName = "demolist";
			break;
		case DT_SAPI_API:
			pageName = "/searchapi/api-refrence";
			break;
		case DT_KEY_RESULT:
			pageName = "yourkey";
			break;
		case DT_TERMS:
			pageName = "/terms";
			break;
		case DT_VIP:
			pageName = "/vip";
			break;
		case DT_ASS_LATLON:
			pageName = "ass_latlon";
			break;
		case DT_ASS_CONVERT:
			pageName = "ass_convert";
			break;
        default:
			pageName = "/welcome";
			break;
	}
    if(pageName.indexOf("/")>=0){
        if(window.location.href.indexOf("union.mapbar.com")>=0){
			pageName = "/apidoc"+pageName;
		}
    }
	pageName = pageName + ".html";
	//window.location.href = "index.jsp?dtype=" + dtype + (typeof anchorName=="string" && anchorName ? "#"+anchorName : "");
    if(dtype == 10&&window.location.href.indexOf(rootUrl)<0){
        window.open(rootUrl+"/index.jsp?dtype=16");
        return;
    }
    window.location.href = pageName+ (typeof anchorName=="string" && anchorName ? "#"+anchorName : "");
    goTop();
}

function goMapbar() {
	//window.parent.window.location.href = "http://www.mapbar.com";
    window.open("http://www.mapbar.com");
}

function goUrl(url,openNewWindow,redi) {
	openNewWindow = openNewWindow || false;
    if(typeof redi!= "undefined") window.parent.searchRedirect = true;
	if(openNewWindow){
        window.open(url);
    }else{
        goTop();
		window.location.href = url;
    }
}

function goExample(name,openNewWindow) {
	openNewWindow = openNewWindow || false;
	var url = "examples/" + name + ".html";
	if(openNewWindow)
		window.open(url);
	else
		window.location.href = url;
}

function showTip(className){
	try {
		var obj = eval("apiData.classes." + className + ";");

		if(typeof obj!="object" || !obj) return;

		var tipbarHtml = "";

		if(obj.construct) tipbarHtml += "<a href='#" + className + "_construct'>构造函数</a>&nbsp;&nbsp;";
		if(obj.property) tipbarHtml += "<a href='#" + className + "_property'>属性</a>&nbsp;&nbsp;";
		if(obj.method) tipbarHtml += "<a href='#" + className + "_method'>方法</a>&nbsp;&nbsp;";
		if(obj.event) tipbarHtml += "<a href='#" + className + "_event'>事件</a>";

		var tipContent = obj.desc;
		if(tipbarHtml) tipContent += "<br><br><p>" + tipbarHtml + "</p>";

		Tip(tipContent, TITLE, className, WIDTH, 300, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, false, CLICKCLOSE, true, DELAY, 100);
		
	} catch(ex) {}
}
function highLight(id){
    var obj = document.getElementById(id);
    if(obj!=null){
        var objs = document.getElementsByTagName("a");
        for(var i = 0;i<objs.length;i++){
            objs[i].className = "";
        }
        obj.className = "highLight";
        window.location.href = window.location.href.split("#")[0]+"#"+id;
    }
}
function validateKeyForm() {
	if(document.getElementById("keyFrom_agree").checked) {
		var url = document.getElementById("keyFrom_url").value;
		var reg = new RegExp("^http://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?(:[0-9]+)?/?$","i");
//        var formStr = "<form id=\"frmKey\" action=\"../apidoc/\" method=\"post\">" +
//                      "<input type=\"hidden\" name=\"keyFrom_url\" id=\"keyFrom_url\" value=\""+url+"\">" +
//                      "</form>";
        
		if(reg.test(url)){
            //alert(typeof window.parent.document.getElementById("footer"));
//            window.parent.document.getElementById("footer").innerHTML += formStr;
            window.parent.document.getElementById("frmKey").keyFrom_url.value = url;
            window.parent.document.getElementById("frmKey").submit();
			return false;
        }else{
			alert("请输入您要使用 Mapbar 地图 API 的有效的网站域名。");
        }
	} else {
		alert("要获得 Mapbar 地图 API 密钥，您必须通过选中该复选框同意这些 API 条款和条件。");
	}
	return false;
}
