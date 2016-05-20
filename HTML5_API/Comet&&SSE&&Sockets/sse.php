<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
while(true){
  echo "data: start\n";
  echo "data:".date("Y-m-d H:i:s")."\n\n";
  // @ob_flush();
  // @flush();
  ob_flush();
  flush();
  sleep(1);
}
?>