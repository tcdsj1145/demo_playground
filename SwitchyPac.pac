function regExpMatch(url, pattern) {    try { return new RegExp(pattern).test(url); } catch(ex) { return false; }    }
    function FindProxyForURL(url, host) {
	if (regExpMatch(url, "http:\\/\\/ad.toutiao\\.com\\/adv_site\\/*")) return 'PROXY 10.6.131.79:9626';
	if (regExpMatch(url, "http:\\/\\/ad\\.toutiao\\.com\\/static\\/*")) return 'PROXY 10.6.131.79:9626';
	if (regExpMatch(url, "http:\\/\\/ad.toutiao\\.com\\/tetris\\/*")) return 'PROXY 10.6.131.79:9627';
	return 'DIRECT';
}