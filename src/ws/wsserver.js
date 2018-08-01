var WebSocketServer = require("ws").Server;
//var fs = require("fs");

var ws = new WebSocketServer({port: 8100});

console.log("[Connection] Server started...");

ws.on('connection', function (ws) {
    console.log("[Connection] Browser connected online...")

    ws.on("message", function (str) {
        var ob = JSON.parse(str);
        switch (ob.type) {
            case 'connection':
                console.log("[Connection] Received: " + ob.content)
                ws.send('{ "type":"connection", "content":"Server ready."}')
                break;
            case 'slide':
                console.log("[Slide] Received: " + ob.type + " num " + ob.numSlide)
                let numSlide = 1;
                if (ob.numSlide) {
                    numSlide = parseInt(ob.numSlide);
                }

                if(numSlide > 0){
                    var data = '{ "type":"slide", "numSlide":"' + numSlide + '"}';
                    ws.send(data);
                } else {
                    console.log("[Slide] Slide num must be > 0");
                }

                break;
        }
    })

    ws.on("close", function () {
        console.log("[Connection] Browser gone.")
    })
});