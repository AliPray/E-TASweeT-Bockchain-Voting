import React from 'react'
import Image from 'next/image'
import logo from '../assets/logo.png'

export default function SideImage() {
  return (
    <div
    class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
  >
    <Image
      src={logo}
      class="h-full w-full"
      alt="logo image"
    />
  </div>
  )
}
