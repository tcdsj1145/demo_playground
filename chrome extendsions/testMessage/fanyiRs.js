chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(!sender.tab){
        if(!request.translation)return;
        document.write(request.translation[0]+"  ");
        var item=null;
        for (var i = 0; i <= request.web.length - 1; i++) {
            item=request.web[i];
            document.write("<hr>"+item.key+"  ");
            for (var j = 0; j <= item.value.length - 1; j++) {
                var str=item.value[j];
                document.write(str+" , ");
            };
        };
    } 

  });
