import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex justify-center bg-white items-center h-screen '>
      <p className='font-bold text-5xl text-ds-blue'>
        Hello World
      </p>
    </div>
  )
}
