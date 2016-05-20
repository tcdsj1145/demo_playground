var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

var connList = []; //存储所有connection

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    var connection = request.accept('echo-protocol', request.origin);
    connList.push(connection);
    console.log((new Date()) + ' Connection accepted.');
    connection.sendUTF('first message from server');
    connection.on('message', function(message) {

        //向其他客户端广播消息
        connList.forEach(function(conn, idx){
            if(conn != connection){  //
                if (message.type === 'utf8') {
                    console.log('Received Message: ' + message.utf8Data);
                    conn.sendUTF(message.utf8Data);
                }
                else if (message.type === 'binary') {
                    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                    conn.sendBytes(message.binaryData);
                }
            }
        });

    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});