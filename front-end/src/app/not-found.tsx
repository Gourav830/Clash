import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div  className='h-screen  flex justify-center  items-center flex-col'>
        <Image src='/error1.svg' width={400} height={400} alt = 'error_image' />

<Link href="/"><Button>Return Home</Button></Link>
    </div>
  )
}