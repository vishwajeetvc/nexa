import bigLogo from '../../public/bigLogo.png'
import exa from '../../public/exa.png'
import thePara from '../../public/thePara.png'
import up from '../../public/up.png'
import down from '../../public/down.png'
import { useEffect, useRef, useState } from 'react'

export default function Home({ peerConnection, localStream, remoteStream, servers }) {

  const [videoVisible, setVideoVisible] = useState(false);
  const offerVideoEl = useRef(null);
  const answerVideoEl = useRef(null);


  async function createOffer() {

    peerConnection.current = new RTCPeerConnection(servers);

    localStream.current = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
    offerVideoEl.current.srcObject = localStream.current;
    offerVideoEl.current.onloadedmetadata = () => offerVideoEl.current.play()

    remoteStream.current = new MediaStream();
    answerVideoEl.current.srcObject = remoteStream.current;
    answerVideoEl.current.onloadedmetadata = () => answerVideoEl.current.play()

    localStream.current.getTracks().forEach((track: any) => {
      peerConnection.current.addTrack(track, localStream.current)
    })

    peerConnection.current.ontrack = (event: any) => {
      event.streams[0].getTracks().forEach((track: any) => {
        remoteStream.current.addTrack(track)
      })
    }

    peerConnection.current.onconnectionstatechange = () => {
      if (peerConnection.current.iceConnectionState == 'connected') {
        setVideoVisible(true);
      }
    }

    peerConnection.current.onicecandidate = (e: any) => {
      if (e.candidate) {
        console.log(JSON.stringify(peerConnection.current.localDescription));
      }
    }

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

  }

  async function createAnswer() {
    peerConnection.current = new RTCPeerConnection(servers);

    localStream.current = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    offerVideoEl.current.srcObject = localStream.current;
    offerVideoEl.current.onloadedmetadata = () => offerVideoEl.current.play();

    remoteStream.current = new MediaStream();
    answerVideoEl.current.srcObject = remoteStream.current;
    answerVideoEl.current.onloadedmetadata = () => answerVideoEl.current.play();

    localStream.current.getTracks().forEach((track: any) => {
      peerConnection.current.addTrack(track, localStream.current);
    })

    peerConnection.current.ontrack = (event: any) => {
      event.strams[0].getTracks().forEach((track: any) => {
        remoteStream.current.addTrack(track);
      })
    }

    peerConnection.current.onconnectionstatechange = () => {
      if (peerConnection.current.iceConnectionState == 'connected') {
        setVideoVisible(true);
      }
    }

    peerConnection.current.onicecandidate = (e: any) => {
      if (e.icecandidate) {
        console.log(peerConnection.current.localDescription);
      }
    }

    const offer = JSON.parse(prompt("Enter the offer"));

    await peerConnection.current.setRemoteDescription(offer);

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

  }

  async function addAnswer() {
    let answer = JSON.parse(prompt("Enter the answer"));
    if (!peerConnection.current.remoteDescription) {
      await peerConnection.current.setRemoteDescription(answer);
    }
  }

  useEffect(() => {
    if (peerConnection.current?.localDescription.type == "offer") {
      setVideoVisible(true);
      offerVideoEl.current.srcObject = localStream.current;
      offerVideoEl.current.onloadedmetadata = () => offerVideoEl.current.play();
      answerVideoEl.current.srcObject = remoteStream.current;
      answerVideoEl.current.onloadedmetadata = () => answerVideoEl.current.play();
    } else if (peerConnection.current?.localDescription.type == "answer") {
      setVideoVisible(true);
      offerVideoEl.current.srcObject = remoteStream.current;
      offerVideoEl.current.onloadedmetadata = () => offerVideoEl.current.play();
      answerVideoEl.current.srcObject = localStream.current;
      answerVideoEl.current.onloadedmetadata = () => answerVideoEl.current.play();
    }
  }, [])


  return (<>
    <div className={`--Cont flex w-full ${videoVisible && 'hidden'} `}>

      <div className='--Left  w-[60%]'
        style={{
          borderRight: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className='--Top relative h-[50%]'>
          <img className="absolute top-[20%] left-[10%]" src={bigLogo} />
          <img className="absolute left-[40%] top-[47%]" src={exa} />
          <img className="absolute left-[43%] top-[70%]" src={thePara} />
          <span className='inline-block w-[90px] h-[3px] absolute left-[50%] top-[77%] bg-red-600'></span>
          <div style={{
            borderTop: ' 10px dotted rgba(255,255,255,0.1)',
          }} className="w-[140px] absolute top-[99%] left-[40%]"></div>
        </div>
        <div className='--Bottom border-red-500 p-5'>

          <div className='text-white p-5'>
            <h1 className='text-4xl pb-3 font-bold text-[rgba(255,255,255,0.9)] '>Features :-</h1>
            <p className='font-extralight text-[rgba(255,255,255,0.8)]'>Real-time Screen Sharing, Real-time Video Calling,
              File Sharing & Chatting.</p>
          </div>
          <div className='text-white p-5'>
            <h1 className='text-4xl pb-3 font-bold text-[rgba(255,255,255,0.9)] '>Creaters :-</h1>
            <p className='font-bold text-[rgba(2,255,255,0.7)]'>Ankit, Javed, Kanhaiya, Prince, Vishwajeet.</p>
          </div>

        </div>
      </div>


      {/* right screen where send and receive button are*/}
      <div className='Right  w-[40%] '>
        <div className='pt-9 h-[50%] flex flex-col items-center justify-center'>

          <img
            onClick={createOffer}
            src={up}
            className='cursor-pointer' />

          <p className='text-3xl font-bold text-white p-5'>Screen Share</p>
        </div>
        <div className=' relative h-[50%] flex flex-col items-center justify-center'>

          <img
            onClick={createAnswer}
            src={down}
            className='cursor-pointer' />

          <p className='text-3xl font-bold text-white p-5'>Screen Recieve</p>
          <span className="absolute bottom-3 font-bold right-4 text-gray-100/20">UI & UX is Designed by vc</span>
        </div>
      </div>
    </div >
    {/* sharing screen it will visible after connection is successfully */}
    <div
      style={{
        width: '100%',
        height: '100vh'
      }}
      className={`${!videoVisible && 'hidden'} relative w-full`}>

      <video
        ref={offerVideoEl}
        className=" absolute w-full h-[100vh] z-0 "></video>

      <video
        ref={answerVideoEl}
        className='w-[200px] bg-red-900 rounded-xl z-10 border-2 border-blue-700 absolute right-4 bottom-4' ></video>


    </div>
  </>)

}
