import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import App from './App.tsx'
import './index.css'
import { io } from 'socket.io-client'

function Main() {
  const [serverIp, setServerIp] = useState("");
  const PORT = 3000;
  const socket = io(`${serverIp}:${PORT}`);
  return <>
    <App {...{ setServerIp, PORT, socket }} />
  </>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Main />
)
