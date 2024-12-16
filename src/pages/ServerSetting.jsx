import { useState } from 'react';
import server from '../../public/server.png'

export default function ServerSetting({ setServerIp }) {


  const [ip, setIp] = useState('');

  return (<>

    <div
      style={{
        backgroundImage: `url(${server})`,
        backgroundSize: '800px 500px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
      }}
      className="w-full h-100vh relative">

      <div className="absolute bottom-[50px] w-[100%] text-white ">
        <h1 className='text-6xl font-bold p-8'>NexaServer</h1>
        <div className='flex text-2xl items-center text-center p-4 gap-4'>
          <p className='text-3xl font-bold text-white p-5'>Server IP</p>
          <div>
            <input
              className="text-center no-underline right-[130px] top-[47%] rounded-xl text-white 
          border border-gray-600 outline-none w-[450px] bg-[#1D2137] z-20 px-4 py-2 "
              placeholder="Enter the IP"
              onChange={(e) => {
                setIp(e.target.value);
              }}
              value={ip}
              type="text" />
          </div>
          <p
            className='text-3xl font-bold text-white cursor-pointer hover:bg-green-700 px-4 py-2 rounded'
            onClick={() => {
              setServerIp(`[${ip}]`);
            }}
          >Connect</p>
        </div>
      </div>

    </div>
  </>)

}
// 2401:4900:3c84:e125:30a2:31f7:e5ae:49e1
