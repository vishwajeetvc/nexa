import bigLogo from '../../public/bigLogo.png'
import exa from '../../public/exa.png'
import thePara from '../../public/thePara.png'
import up from '../../public/up.png'
import down from '../../public/down.png'
export default function Home() {

  return (<>
    <div className='--Cont flex w-full '>

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
          <img src={up} alt="" />
          <p className='text-3xl font-bold text-white p-5'>Screen Share</p>
        </div>
        <div className=' relative h-[50%] flex flex-col items-center justify-center'>
          <img src={down} alt="" />
          <p className='text-3xl font-bold text-white p-5'>Screen Recieve</p>
          <span className="absolute bottom-3 font-bold right-4 text-gray-100/20">UI & UX is Designed by vc</span>
        </div>
      </div>
    </div>
  </>)

}
