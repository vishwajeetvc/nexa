import { useState, useRef } from "react"
import Home from "./pages/Home"
import Navigation from "./pages/Navigation"
import VideoCall from "./pages/VideoCall"
export default function App() {

  const [page, setPage] = useState(0);

  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);

  const serverIp = "[2401:4900:73f2:b904:b153:7dbd:8229:bcae]";
  const PORT = 3000;

  const servers = {
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


  return <>
    <div className="flex w-full bg-[#1D2137]">

      <div>
        <Navigation setPage={setPage} />
      </div>
      {page == 1 && <InDev />}
      {page == 3 && <InDev />}
      {page == 4 && <InDev />}
      {page == 5 && <InDev />}

      {page == 0 && <Home {...{ PORT, serverIp, servers, peerConnection, localStream, remoteStream }} />}
      {page == 2 && <VideoCall {...{ servers, peerConnection, localStream, remoteStream }} />}
    </div>
  </>
}


function InDev() {
  return <div className="flex justify-center items-center w-full">
    <h1 className="text-white font-bold text-4xl">Comming Soon!!</h1>
  </div>
}
