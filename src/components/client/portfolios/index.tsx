import { cn } from '@/lib/utils'
import handDrawn from '@public/portfolios/hand-drawn.svg'
import asterisk from '@public/portfolios/asterisk.svg'
import wifi from '@public/portfolios/wifi.svg'
import Image from 'next/image'

export default function Portfolios() {
  return (
    <div className={cn('flex h-screen items-center justify-center bg-[#FDF5AA]')}>
      <div className='relative size-[620px]'>
        <div className='absolute top-[215px] left-[-45px] h-[310px] w-[250px] overflow-hidden rounded-[48px] bg-[#21c62e]'>
          <Image
            className='absolute bottom-[25px] left-[-55px] opacity-60'
            alt='hand-drawn'
            src={handDrawn}
            width={180}
          />
        </div>
        <div className='absolute bottom-0 left-0 h-[270px] w-[620px] overflow-hidden rounded-[48px] border-8 border-black bg-[#3e5cb6]'>
          <Image
            className='absolute right-[-50px] bottom-[-40px] opacity-60'
            alt='asterisk'
            src={asterisk}
            width={180}
          />
          <Image
            className='absolute bottom-[-130px] left-[25px] rotate-[60deg] opacity-10'
            alt='wifi'
            src={wifi}
            width={620}
          />
          <div className='font-nunito absolute top-[70px] right-[5px] w-[165px] text-xs leading-relaxed font-bold text-white'>
            In your head, In your head they are crying, In your head In your head
          </div>
          <div className='absolute top-[110px] right-[5px] text-xl leading-none font-black text-[#00105A]'>
            ZOMBIE !
          </div>
        </div>
        <div className='absolute top-[20px] right-[-25px] h-[390px] w-[445px] rounded-[48px] bg-[#21c62e]'>
          <div className='font-nunito absolute top-[95px] right-[25px] text-xl font-bold text-white italic'>
            Izzy's best friend
          </div>
          <div className='font-nunito absolute top-[125px] right-[35px] w-[135px] text-center text-xs leading-[1.2] font-bold text-black'>
            you're my best friend, I'll love you forever
          </div>
          <div className='absolute top-[320px] right-[25px] flex gap-6'>
            <button className='font-nunito h-[35px] w-[70px] rounded-[18px] bg-white text-sm font-bold'>chat</button>
            <button className='font-nunito h-[35px] w-[70px] rounded-[18px] bg-white text-sm font-bold'>follow</button>
          </div>
        </div>
        <div className='absolute top-[40px] left-[80px] h-[470px] w-[355px] rounded-[48px] bg-white'>
          <div className='font-sedgwick-ave absolute top-[325px] right-[15px] text-lg text-[#3e5cb6]'>MY SUNSHINE</div>
        </div>
        <div className='absolute top-[40px] left-[-5px] h-[295px] w-[450px] rounded-[48px] bg-[#3e5cb6]'></div>
        <div className='absolute top-[185px] right-[-50px] h-[130px] w-[340px] rounded-[40px] border-8 border-black bg-[#3e5cb6]'></div>
        <div className='absolute top-[10px] left-[-15px] size-[180px] rounded-full bg-white'></div>
        <div className='absolute bottom-[-60px] left-[40px] h-[145px] w-[250px] rounded-[48px] border-8 border-black bg-white'></div>
        <div className='absolute right-[120px] bottom-[-40px] h-[120px] w-[195px] rounded-[48px] border-8 border-black bg-white'></div>
        <div className='absolute top-[-10px] right-[-10px] h-[120px] w-[85px] rounded-[18px] bg-white'></div>
        <div className='absolute top-[-10px] right-[80px] h-[120px] w-[85px] rounded-[18px] bg-white'></div>
        <div className='absolute bottom-[135px] left-[105px] h-[125px] w-[190px] rounded-[30px] bg-[#21c62e]'></div>
      </div>
    </div>
  )
}
