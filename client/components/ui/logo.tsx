import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='relative w-5 h-5 border-red-50'>
        <Image
        src={"/icon.png"}
        alt={"collabo-logo"}
        fill={true}
        style={{
            objectFit: 'cover',
        }}
        />
    </div>
  )
}

export default Logo