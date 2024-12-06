import { useEffect, useRef, useState } from 'react';
import bigLogo from '../../public/bigLogo.png'
import exa from '../../public/exa.png'

const VideoCall = ({ peerConnection, localStream, remoteStream }) => {
  const [obj, setObj] = useState(""); // setting the textarea
  const [videoVisible, setVideoVisible] = useState(false);

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

    localStream.current = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
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
    peerConnection.current.onconnectionstatechange = function() {
      if (peerConnection.current.iceConnectionState == 'connected') {
        setVideoVisible(true);
      }
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

    peerConnection.current.onconnectionstatechange = function() {
      if (peerConnection.current.iceConnectionState == 'connected') {
        setVideoVisible(true);
      }
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

  useEffect(() => {

    if (peerConnection.current?.localDescription.type == "offer") {

      setVideoVisible(true);
      offerVdo.current.srcObject = localStream.current;
      offerVdo.current.onloadedmetadata = () => offerVdo.current.play();
      answerVdo.current.srcObject = remoteStream.current;
      answerVdo.current.onloadedmetadata = () => answerVdo.current.play();

    } else if (peerConnection.current?.localDescription.type == "answer") {

      setVideoVisible(true);
      offerVdo.current.srcObject = remoteStream.current;
      offerVdo.current.onloadedmetadata = () => offerVdo.current.play();
      answerVdo.current.srcObject = localStream.current;
      answerVdo.current.onloadedmetadata = () => answerVdo.current.play();

    }

  }, [])

  return (
    <div className='flex-grow h-[100vh]'>

      <div className={`${videoVisible && 'hidden'}  h-[100vh] relative`} >

        <div className="relative  h-[40vh] top-[40px]">
          <img className="absolute top-[0%] left-[0%]" src={bigLogo} />
          <img className="absolute left-[18%] top-[33%]" src={exa} />
          <h1
            className='text-6xl absolute font-bold text-red-500
                       top-[31%] left-[32%]
            '>Video Call</h1>
        </div>
        <div className=''>
          <div className='flex  py-[20px] justify-evenly'>
            <VideoCallButton onClick={createOffer} title={"Offer"} />
            <VideoCallButton onClick={createAnswer} title={"Answer"} />
            <VideoCallButton onClick={addAnswer} title={"Add Answer"} />
          </div>

          <div className='p-5 h-[200px] absolute w-full bottom-0 '>
            <div className='flex hover:outline outline-red-600   bg-[#0B192C] rounded-xl p-2 h-[100%] overflow-hidden justify-center'>
              <textarea
                style={{
                  resize: 'none',
                }}
                className=' snap-none p-2 w-full h-[100%] bg-[#0B192C] text-white border-none outline-none  '
                value={obj}
                onChange={(e) => {
                  setObj(e.target.value);
                }}></textarea>
            </div>
          </div>
        </div>

        {/* <div className='flex'> */}
        {/*   <div className="sender"> */}
        {/*     <button onClick={createOffer}>Offer</button> */}
        {/*   </div> */}
        {/**/}
        {/*   <div className="receiver"> */}
        {/*     <button onClick={createAnswer}>Answer</button> */}
        {/*   </div> */}
        {/*   <button onClick={addAnswer}>Add-Answer</button> */}
        {/* </div> */}
        {/* <textarea className='border w-[400px]' value={obj} onChange={(e) => { */}
        {/*   setObj(e.target.value); */}
        {/*   // console.log(obj); */}
        {/* }}></textarea> */}

      </div >

      <div
        style={{
          // border: '5px solid red',
          width: '100%',
          height: '100vh'
        }}
        className={`${!videoVisible && 'hidden'} relative w-full`}>

        <video
          ref={answerVdo}
          className=" absolute w-full h-[100vh] z-0 "></video>

        <video
          ref={offerVdo}
          className='w-[200px] bg-red-900 rounded-xl z-10 border-2 border-blue-700 absolute right-4 bottom-4' ></video>


      </div>

    </div>
  )
}
export default VideoCall;








{/* <button onClick={createOffer}>Offer</button> */ }

function VideoCallButton({ title, onClick }) {
  return (<>
    <button
      onClick={onClick}
      className={`text-3xl shadow-xl font-bold text-white bg-[#0B192C]
                px-7 py-4 rounded-xl hover:outline outline-red-600`}
    >{title}</button>
  </>)
}


