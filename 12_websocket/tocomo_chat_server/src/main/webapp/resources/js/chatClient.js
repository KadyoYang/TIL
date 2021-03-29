"use strict";
var connection = null;
var clientID = 0;


// 유저네임 설정
function setUsername() {
  console.log("***SETUSERNAME");
  var msg = {
    name: document.getElementById("name").value,
    date: Date.now(),
    id: clientID,
    type: "setUserName"
  };
  connection.send(JSON.stringify(msg));
}




function connect() {
  var serverUrl;
  var scheme = "ws";

  var userName = document.getElementById("name").value;

  // If this is an HTTPS connection, we have to use a secure WebSocket
  // connection too, so add another "s" to the scheme.

  if (document.location.protocol === "https:") {
    scheme += "s";
  }

  serverUrl = scheme + "://" + document.location.hostname + "/ws:8080";

  connection = new WebSocket(serverUrl, "json");
  console.log("***CREATED WEBSOCKET");

  
  // on Open
  connection.onopen = function(evt) {
    console.log("***ONOPEN");
    document.getElementById("text").disabled = false;
    document.getElementById("send").disabled = false;
  };
  console.log("***CREATED ONOPEN");

  // on Close
  connection.onclose = function(evt){
      console.log("websocket is closed now");
      document.getElementById("text").disabled = true;
      document.getElementById("send").disabled = true;
  }

  // on message
  connection.onmessage = function(evt) {
    console.log("***ONMESSAGE");
    var f = document.getElementById("chatbox").contentDocument;
    var text = "";
    var msg = JSON.parse(evt.data);
    console.log("Message received: ");
    console.dir(msg);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();

    switch(msg.type) {
      case "id":
        clientID = msg.id;
        setUsername();
        break;
      case "setUserName":
        text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
        break;
      case "message":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
        break;
      case "rejectusername":
        text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>";
        break;
      case "userlist":
        var ul = "";
        var i;

        for (i=0; i < msg.users.length; i++) {
          ul += msg.users[i] + "<br>";
        }
        document.getElementById("userlistbox").innerHTML = ul;
        break;
    }

    if (text.length) {
      f.write(text);
      document.getElementById("chatbox").contentWindow.scrollByPages(1);
    }
  };
  console.log("***CREATED ONMESSAGE");
}


// 채팅 메시지 send
function send() {
  console.log("***SEND");
  var msg = {
    text: document.getElementById("text").value,
    type: "message",
    id: clientID,
    date: Date.now()
  };
  connection.send(JSON.stringify(msg));
  document.getElementById("text").value = "";
}


function handleKey(evt) {
  if (evt.keyCode === 13 || evt.keyCode === 14) {
    if (!document.getElementById("send").disabled) {
      send();
    }
  }
}