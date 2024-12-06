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
      {page == 1 && <h1>Hello page 3</h1>}
      {page == 4 && <h1>Hello page 4</h1>}
      {page == 5 && <h1>Hello page 5</h1>}

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
