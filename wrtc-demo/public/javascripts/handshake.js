let localStream, remoteStream;
let peerConnection;

let servers = {
    iceServers: [
        {
            urls: ['stun:stun1.1.google.com:19302','stun:stun2.1.google.com:19302']
        }
    ]
}

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    document.getElementById("user-1").srcObject = localStream;
}

let createPeerConnection = async (selector) => {
    peerConnection = new RTCPeerConnection(servers);
    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    }

    peerConnection.onicecandidate = (event) => {
        if(event.candidate){
            document.getElementById(selector).value = JSON.stringify(peerConnection.localDescription);
        }
    }
}

let createOffer = async () => {
    await createPeerConnection('offer-sdp');
    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    document.getElementById("offer-sdp").value = JSON.stringify(offer);
}

let createAnswer = async () => {
    await createPeerConnection('answer-sdp');
    let offerText = document.getElementById("offer-sdp").value;
    if(!offerText){
        return alert("Retrieve offer from client first...");
    }

    const offer = JSON.parse(offerText);
    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    document.getElementById("answer-sdp").value = JSON.stringify(answer);
}

let addAnswer = async () => {
    let answerText = document.getElementById("answer-sdp").value;
    if(!answerText){
        return alert("Retrieve answer from client first...");
    }

    let answer = JSON.parse(answerText);
    if(!peerConnection.currentRemoteDescription) {
        await peerConnection.setRemoteDescription(answer);
    }
}

init();

document.getElementById("create-offer").addEventListener('click', createOffer);
document.getElementById("create-answer").addEventListener('click', createAnswer);
document.getElementById("add-answer").addEventListener('click', addAnswer);