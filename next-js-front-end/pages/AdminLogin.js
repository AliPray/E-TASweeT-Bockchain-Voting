import React from 'react'
import logo from "../assets/logo.png"
import Image from 'next/image'
import {useEffect, useState} from "react"
import ABI  from "../constants/abi.json"
import { ethers } from 'ethers'
import metamasklogo from '../assets/metamasklogo.png'
import InstallMetaMask from "../components/InstallMetaMask"
import contractAdd from "../constants/contractAddress.json"




export default function AdminLogin() {
  
  const contractAddress = contractAdd.addr
  
  //states for checking metamask in borwser, connected, and set the singer form the connected wallet
  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("")
  const [error, setError] = useState()

  

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  },[]);

  //login function for admin:
  async function loginAdmin(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      var ownerAdd
      try {
         ownerAdd = await contract.returnOwner()
         localStorage.setItem("userId","admin")
         localStorage.setItem("userAdd", ownerAdd)
        
         window.location.href = '/ElectionSettings';  

      } catch (error) {
        setError("this user is not the admin!")
      }

    } else {
        console.log("Please install MetaMask");
    }
  }



  //functin to connect to metamask wallet account 
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        var userAdd = accounts[0];
        setAddress(userAdd)
        

      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }


    return (
      <div>
        
        {hasMetamask ? (
        isConnected? (
          <div className="h-screen md:flex justify-center">
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <div className="bg-white ">
              <Image src={logo} alt="logo image"className="scale-75 rounded-full mx-20"></Image>
              <h1 className="text-gray-800 font-bold text-2xl mb-1 ">Admin Login</h1>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <p className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="User Address">{address.slice(0, 7)+"................................"}</p>  
              </div>
              <button onClick={()=>loginAdmin()} className="block w-full bg-blue-500 hover:bg-blue-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
              <div class="flex items-center text-red-600 text-sm font-bold px-4 py-3" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>{error}</p>
              </div>
          </div>
          </div>
          </div>
        ) : (
          <div className='grid place-items-center h-screen'>
          
          <button onClick={()=>connect()} className="w-60 h-20 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
          <Image className='scale-50' src={metamasklogo} alt="Meta mask logo"></Image>
          Connect to Metamask!</button>

        </div>
        )
        ) : (
          <InstallMetaMask></InstallMetaMask>
        )}
      
        
      </div>
  )
}
