var WebSocketServer = require("ws").Server;
var Base64 = require('js-base64').Base64;
var fs = require("fs");

var ws = new WebSocketServer({port: 8100});

console.log("Server started...");

ws.on('connection', function (ws) {
    //console.log("[Connection] Browser connected online...");

    ws.on("message", function (str) {
        var ob = JSON.parse(str);
        switch (ob.event) {
            case 'REQUEST_JOIN':
                console.log("[REQUEST_JOIN] Meeting: " + ob.meeting + " User: " + ob.user.id);

                $isAuthorized = checkUserAuthorization(ob.user);

                if($isAuthorized){
                    ws.send('{ "meeting": "' + ob.meeting + '", "event": "JOIN", "user": {"id": "54F12","type": "learner","name": "Psio","avatar": "https://...."}}');
                } else {
                    ws.send('{ "meeting": "' + ob.meeting + '", "event": "JOIN", "user": {"type": "learner","name": "Psio","avatar": "https://...."}}');
                }
                break;
            case 'REQUEST_SLIDE':
                console.log("[REQUEST_SLIDE] Received: " + ob.meeting + " slide " + ob.slide);
                let numSlide = 1;
                if (ob.slide) {
                    numSlide = parseInt(ob.slide);
                }

                let imgData = Base64.encode('http://localhost/react/memory/src/resources/ppt/' + ob.meeting + '/' + numSlide + '.jpg');
                let length = 6;

                if (numSlide > 0 && numSlide <= length) {
                    var data = '{ "event":"SLIDE", "meeting":"' + ob.meeting + '", "current":"' + numSlide + '","length":"' + length + '", "data":"' + imgData + '"}';
                    ws.send(data);
                } else {
                    console.log("[REQUEST_SLIDE] Slide num must be between 0 and " + length);
                }

                break;
        }
    });

    ws.on("close", function () {
        console.log("[Connection] Browser gone.")
    })
});

function checkUserAuthorization($user){
    return true;
}