import React from 'react'
import Image from 'next/image'
import metamasklogo from "../assets/metamasklogo.png"
import sepolia from "../assets/sepolia.png"

export default function InstallMetaMask() {
  return (
    <div className="bg-blue-100 font-sans w-full min-h-screen m-0 grid place-items-center">
        <div className="grid place-items-center">

            <div className='w-20 '>
                <div className='w-full border-8 border-purple-300'>
                    <Image className='scale-50 ' src={metamasklogo} alt="Meta mask logo"></Image>
                    <Image className='scale-50' src={sepolia} alt="Meta mask logo"></Image> 
                </div>
            </div>
            <h1 className='font-bold'>Watch this Video to learn how:</h1>
            <h1 className='font-bold'>Install, connect to Metamask wallet, and connect to Sepolia Network!</h1>
            <h1 className='font-bold'>please watch the two video below do so!</h1>
            <div className="w-full h-full bg-white px-6 py-4 grid grid-cols-2 gap-2 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="aspect-w-16 aspect-h-9">
                    <iframe src="https://www.youtube.com/embed/r9jwGansp1E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe src="https://www.youtube.com/embed/r9jwGansp1E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    </div>
  )
}
