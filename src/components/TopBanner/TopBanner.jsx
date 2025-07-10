import React from 'react'
import Image from 'next/image'
export const TopBanner = () => {
  return (
    <div className='p-6'>
        <Image
        src={'/Image/ad-banner.jpg'}
        height={200}
        width={800}
        className='w-full'
        alt='Banner'
        />
    </div>
  )
}
