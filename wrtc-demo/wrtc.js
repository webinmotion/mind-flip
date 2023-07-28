var pc = new WebkitRTCPeerCOnnection(servers, {
    optional: [{RtpDataChannels: true}]
});

pc.ondatachannel = e => {
    receiveChannel = e.channel;
    receiveChannel.onmessage = function(ev) {
        document.querySelector("div#receive").innerHTML = ev.data;
    };
};

sendChannel = pc.createDataChannel("sendDataChannel", {reliable: false});

document.querySelector("button#send").onclick = function (){
    var data = document.querySelector("textarea#message").value;
    sendChannel.send(data);
}