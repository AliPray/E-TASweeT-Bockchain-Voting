import React from 'react'
import UserNavBar from '../components/UserNavBar'
import Footer from "../components/Footer"
import Image from 'next/image'
import show1 from "../assets/show1.png"
import show2 from "../assets/show2.jpg"
import show3 from "../assets/show3.png"
import voterpic from "../assets/voterpic.png"

export default function VoterHomePage() {
  
  
  return (
    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
      <UserNavBar></UserNavBar>
      <div>
        <div className="grid place-items-center">
            <h1 className='box-border hover:box-content border-y-4 border-blue-500 text-6xl subpixel-antialiased font-mono'>Welcome to E-T@SWeeT</h1>
            {/* content */}
            <div>
              <Image src={show1}></Image>
                <div className='grid grid-cols-3 gap-4'>
                  <div class="rounded overflow-hidden shadow-lg  border-solid border-2 border-blue-600">
                    <Image class="scale-75 rounded-full" src={show2} alt="show2pic"></Image>
                    <div>
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Free and Fast Voting⚡️🏃🏻💨💨</div>
                        <p class="text-gray-700 text-base">
                            use the blockchain technology to cast your vote and wait for the results to be shown.
                        </p>
                      </div>
                    </div> 
                  </div>
                  <div class="rounded overflow-hidden shadow-lg  border-solid border-2 border-blue-600">
                    <div>
                      <Image className='scale-50' src={show3}></Image>
                    <div class="px-6 py-4 ">
                        <div class="font-bold text-xl mb-2">Why E-T@SWeeT?👏 </div>
                        <p class="text-gray-700 text-base">
                          E-T@SWeeT deliver the best alternative for Election Voting. 
                          Voting on the blockchain has never been easy. You can just click couple of buttons
                          and ensure that your vote has been cast to the right person without the fear of it
                        </p>
                        <p className='text-bold text-l'> Getting Lost, Stolen, or erased!</p>
                      </div>
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Why Blockchain?🔒</div>
                        <p class="text-gray-700 text-base">
                          Blockhain technology preserve the information and data on the blockchain network while
                          limiting attackers and intruders from corrupting data inside.
                        </p>
                      </div>
                    </div> 
                  </div>
                  <div class="rounded overflow-hidden shadow-lg  border-solid border-2 border-blue-600">
                    <Image class="scale-50" src={voterpic} alt="voterpicinfo"></Image>
                    <div>
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">The system has been developed for my degree's Final Year
                        Project
                        </div>
                        <p class="text-gray-700 text-base">
                        🙏Big Thanks to ya'll out there who cheered for me and helped directly or undirectly.👊
                        </p>
                      </div>
                    </div> 
                  </div>

                </div>
            </div>
             

        </div>
      </div>
      <Footer></Footer>
      
    </div>
  )
}
