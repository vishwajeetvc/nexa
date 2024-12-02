import { useRef, useState } from 'react';

export default function VideoCall() {
  const [obj, setObj] = useState("");

  let peerConnection = useRef(null);
  let localStream = useRef(null);
  let remoteStream = useRef(null);
  let offerVdo = useRef(null);
  let answerVdo = useRef(null);

  let servers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.l.google.com:5349" },
      { urls: "stun:stun1.l.google.com:3478" },
      { urls: "stun:stun1.l.google.com:5349" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:5349" },
      { urls: "stun:stun3.l.google.com:3478" },
      { urls: "stun:stun3.l.google.com:5349" },
      { urls: "stun:stun4.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:5349" },
    ]
  }

  async function createOffer() {
    peerConnection.current = new RTCPeerConnection(servers);

    localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    offerVdo.current.srcObject = localStream.current;
    offerVdo.current.onloadedmetadata = () => offerVdo.current.play();

    remoteStream.current = new MediaStream();
    answerVdo.current.srcObject = remoteStream.current;
    answerVdo.current.onloadedmetadata = () => answerVdo.current.play();

    localStream.current.getTracks().forEach(function(track: any) {
      peerConnection.current.addTrack(track, localStream.current);
    })

    peerConnection.current.ontrack = function(event: any) {
      event.streams[0].getTracks().forEach(function(track: any) {
        remoteStream.current.addTrack(track);
      })
    }
    peerConnection.current.onicecandidate = function(event: any) {
      if (event.candidate) {
        setObj(JSON.stringify(peerConnection.current.localDescription));
      }
    }

    let offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    //
    //   // let answer; // will get from the server using socket and after that (await)
    //   //
    //   // if (!peerConnection.currentRemoteDescription) {
    //   //   await peerConnection.setRemoteDescription(answer);
    //   // }
    //
  }
  async function createAnswer() {
    peerConnection.current = new RTCPeerConnection(servers);

    localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    offerVdo.current.srcObject = localStream.current;
    offerVdo.current.onloadedmetadata = () => offerVdo.current.play();

    remoteStream.current = new MediaStream();
    answerVdo.current.srcObject = remoteStream.current;
    answerVdo.current.onloadedmetadata = () => answerVdo.current.play();

    localStream.current.getTracks().forEach(function(track: any) {
      peerConnection.current.addTrack(track, localStream.current);
    })

    peerConnection.current.ontrack = function(event: any) {
      event.streams[0].getTracks().forEach(function(track: any) {
        remoteStream.current.addTrack(track);
      })
    }

    peerConnection.current.onicecandidate = function(e: any) {
      if (e.candidate) {
        setObj(JSON.stringify(peerConnection.current.localDescription));
      }
    }

    let offer = JSON.parse(obj);

    await peerConnection.current.setRemoteDescription(offer);

    let answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

  }
  async function addAnswer() {
    let answer = JSON.parse(obj);
    if (!peerConnection.current.remoteDescription) {
      await peerConnection.current.setRemoteDescription(answer);
    }
  }

  return (
    <div>
      <h1 className='text-red-900 text-3xl'>Nexa! this project is using react+tailwind+electron</h1>
      <div className='flex'>
        <div className="sender">
          <video className='w-[400px] border' ref={offerVdo}></video>
          <button onClick={createOffer}>Offer</button>
        </div>

        <div className="receiver">
          <video ref={answerVdo} className="w-[400px] border"></video>
          <button onClick={createAnswer}>Answer</button>
        </div>
        <button onClick={addAnswer}>Add-Answer</button>
      </div>
      <textarea className='border w-[400px]' value={obj} onChange={(e) => {
        setObj(e.target.value);
        console.log(obj);
      }}></textarea>
    </div>
  )
}

