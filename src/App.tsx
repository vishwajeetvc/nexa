import { useState, useRef } from "react"
import Home from "./pages/Home"
import Navigation from "./pages/Navigation"
import VideoCall from "./pages/VideoCall"
export default function App() {

  const [page, setPage] = useState(0);

  const peerConnection = useRef(null);
  let localStream = useRef(null);
  let remoteStream = useRef(null);


  return <>
    <div className="flex w-full bg-[#1D2137]">

      <div>
        <Navigation setPage={setPage} />
      </div>

      {page == 0 && <Home />}
      {page == 1 && <InDev />}
      {page == 3 && <InDev />}
      {page == 4 && <InDev />}
      {page == 5 && <InDev />}

      {
        page == 2 &&
        <VideoCall
          peerConnection={peerConnection}
          localStream={localStream}
          remoteStream={remoteStream}
        />
      }
    </div>
  </>
}


function InDev() {
  return <div className="flex justify-center items-center w-full">
    <h1 className="text-white font-bold text-4xl">😜Comming Soon!!</h1>
  </div>
}
