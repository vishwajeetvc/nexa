
import nexa from "../../public/logo.png"
import setting from "../../public/setting.png"
import videoCall from "../../public/videoCall.png"
import chat from "../../public/chat.png"
import cross from "../../public/cross.png"
import i from "../../public/i.png"

function Icon({ icon, moreCss }: any) {
  return <>
    <img className={`cursor-pointer ${moreCss}`} src={icon} />
  </>
}
export default function Navigation() {
  return <>
    <div
      style={{
        borderRight: "5px solid #FF2559"
      }}
      className="w-[80px] bg-[#0B192C] ">
      <div className="h-[100vh] flex flex-col justify-between ">
        <div className=" flex-col flex items-center pt-5 gap-5 ">
          <Icon icon={nexa} moreCss="w-[50px]" />
          <Icon icon={setting} moreCss="w-[30px]" />
          <Icon icon={videoCall} moreCss="w-[30px]" />
          <Icon icon={chat} moreCss="w-[25px]" />
        </div>
        <div className=" flex-col flex items-center pb-5 gap-5 ">
          <Icon icon={i} moreCss="w-[30px]" />
          <Icon icon={cross} moreCss="w-[22px]" />
        </div>
      </div>
      <div>
      </div>
    </div>
  </>
}
