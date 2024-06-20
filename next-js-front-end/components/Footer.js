import React from 'react'
import logo from "../assets/logo.png"
import Image from 'next/image'

export default function Footer() {
  return (
    
    
    <footer class="p-4 bg-white sm:p-6 dark:bg-gray-900">
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <div class="flex items-center">
                    <Image class="scale-75 rounded-full shadow-lg" src={logo} alt="Bonnie image"/>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">&nbsp;E-T@SWeeT</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li>
                            <a href="https://sepolia.dev/" target="_blank" class="hover:underline">Ethereum Sepolia Testnet</a>
                        </li>
                        <li>
                            <a href="https://docs.soliditylang.org/en/v0.8.17/" target="_blank" class="hover:underline">Solidity</a>
                        </li>
                        <li>
                            <a href="https://nextjs.org/" target="_blank" class="hover:underline">NextJs</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="/TermsAndConditions" target="_blank" class="hover:underline">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/TermsAndConditions" target="_blank" class="hover:underline">Terms &amp; Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 E-T@SWeeT. All Rights Reserved.
            </span>
            
        </div>
    </footer>

  )
}
