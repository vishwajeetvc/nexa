import { ipcRenderer } from "electron"
import nexa from "../../public/logo.png"
import setting from "../../public/setting.png"
import videoCall from "../../public/videoCall.png"
import chat from "../../public/chat.png"
import cross from "../../public/cross.png"
import i from "../../public/i.png"
import { Link } from "react-router"

function Icon({ icon, moreCss, onClick, style }: any) {
  return <>
    <img style={{ WebkitAppRegion: 'no-drag' }} onClick={onClick} className={`cursor-pointer ${moreCss}`} src={icon} />

  </>
}
export default function Navigation() {
  return <>
    <div
      style={{
        borderRight: "5px solid #FF2559",
        WebkitAppRegion: 'drag',
      }}
      className="w-[80px] bg-[#0B192C] ">
      <div className="h-[100vh] flex flex-col justify-between ">
        <div className=" flex-col flex items-center pt-5 gap-5 ">

          <Link to="/">
            <Icon icon={nexa} moreCss="w-[50px]" />
          </Link>

          <Icon icon={setting} moreCss="w-[30px]" />

          <Link to="videoCall">
            <Icon icon={videoCall} onClick={() => {
            }} moreCss="w-[30px]" />
          </Link>

          <Icon icon={chat} moreCss="w-[25px]" />
        </div>
        <div className=" flex-col flex items-center pb-5 gap-5 ">
          <Icon icon={i} moreCss="w-[30px]" />
          <Icon onClick={() => {
            ipcRenderer.send('close-window');
          }} icon={cross} moreCss="w-[32px]" />
        </div>
      </div>
      <div>
      </div>
    </div>
  </>
}
