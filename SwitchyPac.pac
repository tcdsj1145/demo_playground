function regExpMatch(url, pattern) {    try { return new RegExp(pattern).test(url); } catch(ex) { return false; }    }
    function FindProxyForURL(url, host) {
	if (shExpMatch(url, "http://s2.pstatp.com/adstatic/essay_ad_wap/static/*")) return 'DIRECT';
	if (shExpMatch(url, "http://s0.pstatp.com/adstatic/essay_ad_wap/static/*")) return 'DIRECT';
	if (regExpMatch(url, "http:\\/\\/ad\\.toutiao\\.com\\/adv_site\\/*")) return 'PROXY 10.6.131.79:9626';
	if (regExpMatch(url, "http:\\/\\/ad\\.toutiao\\.com\\/adver\\/*")) return 'PROXY 10.6.131.79:9626';
	if (regExpMatch(url, "http:\\/\\/ad\\.toutiao\\.com\\/ad\\/*")) return 'PROXY 10.6.131.79:9626';
	if (regExpMatch(url, "http:\\/\\/ad\\.toutiao\\.com\\/static\\/*")) return 'PROXY 10.6.131.79:9626';
	if (regExpMatch(url, "http:\\/\\/ad\\.toutiao\\.com\\/tetris\\/*")) return 'PROXY 10.6.131.79:9627';
	return 'DIRECT';
}