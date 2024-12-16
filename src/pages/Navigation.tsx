import { ipcRenderer } from "electron"
import nexa from "../../public/logo.png"
import setting from "../../public/setting.png"
import videoCall from "../../public/videoCall.png"
import chat from "../../public/chat.png"
import cross from "../../public/cross.png"
import i from "../../public/i.png"

function Icon({ icon, moreCss, onClick }: any) {
  return <>
    <img style={{ WebkitAppRegion: 'no-drag' }} onClick={onClick} className={`cursor-pointer ${moreCss}`} src={icon} />

  </>
}
export default function Navigation({ setPage, online }) {
  return <>
    <div
      style={{
        borderRight: `5px solid ${online ? "#00FF1E" : '#FF2559'}`,
        WebkitAppRegion: 'drag',
      }}
      className="w-[80px] bg-[#0B192C] ">
      <div className="h-[100vh] flex flex-col justify-between ">
        <div className=" flex-col flex items-center pt-5 gap-5 ">

          <Icon
            icon={nexa}
            onClick={() => {
              setPage(0)
            }}
            moreCss="w-[50px]" />

          <Icon
            icon={setting}
            onClick={() => {
              setPage(1)
            }}
            moreCss="w-[30px]" />

          <Icon
            icon={videoCall}
            onClick={() => {
              setPage(2)
            }}
            moreCss="w-[30px]" />

          <Icon
            icon={chat}
            onClick={() => {
              setPage(3)
            }} moreCss="w-[25px]" />
        </div>
        <div className=" flex-col flex items-center pb-5 gap-5 ">

          <Icon
            icon={i}
            onClick={() => {
              setPage(4)
            }}
            moreCss="w-[30px]" />

          <Icon
            icon={cross}
            onClick={() => {
              ipcRenderer.send('close-window');
            }}
            moreCss="w-[32px]" />

        </div>
      </div>
      <div>
      </div>
    </div>
  </>
}
