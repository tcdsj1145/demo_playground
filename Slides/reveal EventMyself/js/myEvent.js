var ev = new Press();
var websocket = new WebSocket('ws://192.168.199.184:8080', 'echo-protocol');
websocket.onopen = function(e) {
  console.log(e);
}
websocket.onmessage = function(e) {
  console.log(e);
  if (e.data == 'right') {
    ev.pressRight();
  }
}


// setInterval(function() {
//   ev.pressRight();
// }, 2000);



function Press() {
  this.pressRight = function() {
    this.initKeyEvent2(39);
  }



  this.initKeyEvent2 = function(keyCode) {
    var el = document.body;
    var eventObj = document.createEventObject ?
      document.createEventObject() : document.createEvent("Events");

    if (eventObj.initEvent) {
      eventObj.initEvent("keydown", true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj);

  }


  // webkit do not work
  this.initKeyEvent = function() {
    // var evt = document.createEvent("Event");
    //     evt.initEvent("keydown", true, true);

    var evt = document.createEvent("KeyboardEvent");
    var initMethod = typeof evt.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

    evt[initMethod](
      "keydown",
      true, // bubbles oOooOOo0
      true, // cancelable
      window, // view
      false, // ctrlKeyArg
      false, // altKeyArg
      false, // shiftKeyArg
      false, // metaKeyArg
      39,
      0 // charCode
    );
    var canceled = !document.body.dispatchEvent(evt);
    if (canceled) {
      // A handler called preventDefault
      console.log("canceled");
    } else {
      // None of the handlers called preventDefault
      console.log("not canceled");
    }

  }
}


document.addEventListener("keydown", function(e) {
  traceEvent(e);
});

function traceEvent(e) {
  console.log(e);
}
