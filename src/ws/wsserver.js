var WebSocketServer = require("ws").Server;
var Base64 = require('js-base64').Base64;
var fs = require("fs");

var ws = new WebSocketServer({port: 8100});

console.log("[Connection] Server started...");

ws.on('connection', function (ws) {
    console.log("[Connection] Browser connected online...");

    ws.on("message", function (str) {
        var ob = JSON.parse(str);
        switch (ob.type) {
            case 'connection':
                console.log("[Connection] Received: " + ob.content);
                ws.send('{ "type":"connection", "content":"Server ready."}');
                break;
            case 'slide':
                console.log("[Slide] Received: " + ob.idPpt + " slide " + ob.numSlide);
                let numSlide = 1;
                if (ob.numSlide) {
                    numSlide = parseInt(ob.numSlide);
                }

                let imgData = Base64.encode('http://localhost/react/memory/src/resources/ppt/1_ppt/' + numSlide + '.jpg');
                let length = 6;

                if (numSlide > 0 && numSlide <= length) {
                    var data = '{ "type":"slide", "idPpt":"1_ppt", "numSlide":"' + numSlide + '","length":"' + length + '", "data":"' + imgData + '"}';
                    ws.send(data);
                } else {
                    console.log("[Slide] Slide num must be between 0 and " + length);
                }

                break;
        }
    });

    ws.on("close", function () {
        console.log("[Connection] Browser gone.")
    })
});