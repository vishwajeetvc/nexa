import { useState, useRef } from "react"
import Home from "./pages/Home"
import Navigation from "./pages/Navigation"
import VideoCall from "./pages/VideoCall"
import ServerSetting from "./pages/ServerSetting"

export default function App({ setServerIp, PORT, socket }) {

  const [page, setPage] = useState(0);

  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const [online, setOnline] = useState(false);

  socket.on('connect', () => {
    if (online) return;
    setOnline(true);
  })

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
        <Navigation setPage={setPage} online={online} />
      </div>
      {page == 1 && <ServerSetting setServerIp={setServerIp} />}
      {page == 3 && <InDev />}
      {page == 4 && <InDev />}
      {page == 5 && <InDev />}

      {page == 0 && <Home {...{ socket, PORT, servers, peerConnection, localStream, remoteStream, setOnline, online }} />}
      {page == 2 && <VideoCall {...{ servers, peerConnection, localStream, remoteStream }} />}
    </div>
  </>
}


function InDev() {
  return <div className="flex justify-center items-center w-full">
    <h1 className="text-white font-bold text-4xl">Comming Soon!!</h1>
  </div>
}
