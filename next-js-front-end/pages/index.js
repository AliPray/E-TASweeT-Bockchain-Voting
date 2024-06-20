import React from 'react'
import logo from "../assets/logo.png"
import Image from 'next/image'
import {useEffect, useState} from "react"
import { ethers } from 'ethers'
import metamasklogo from "../assets/metamasklogo.png"
import ABI  from "../constants/abi.json"
import contractAdd from "../constants/contractAddress.json"
import InstallMetaMask from "../components/InstallMetaMask"


export default function Login() {


  const contractAddress = contractAdd.addr

  //states for checking metamask in borwser, connected, and set the singer form the connected wallet
  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("")
  const [error, setError]= useState()
  



  //render page once onload

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);

    }
  },[]);

    //functin to connect to metamask wallet account 
    async function connect() {
      if (typeof window.ethereum !== "undefined") {
        try {
          await ethereum.request({ method: "eth_requestAccounts" });
          setIsConnected(true);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setSigner(provider.getSigner());
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          console.log(accounts[0]);
          var userAdd = accounts[0];
          setAddress(userAdd)
        } catch (e) {
          console.log(e);
        }
      } else {
        setIsConnected(false);
      }
    }

  //login function
  async function login(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const voterInfo = await contract.getVoterinfo()
        var array = [];
          for(var i=0;i<voterInfo.length;i++){
              array.push(voterInfo[i].toString());
          }
          window.location.href = '/VoterHomePage';  

      } catch (error) {
        setError("this Voter's wallet address not registered yet! 🔄")
      }

    } else {
        console.log("Please install MetaMask");
    }
  }

  return (

    <div>
    
    {hasMetamask ? (
      isConnected ? (
        <div className="h-screen md:flex">
        <div
          className="bg-side-image bg-auto bg-no-repeat relative overflow-hidden md:flex w-1/2  justify-around items-center hidden">
          <div className="h-40 w-90 bg-sky-300 rounded-lg p-4  hover:bg-sky-600 mt-20">
            <h1 className="text-white font-bold text-4xl font-sans">E-T@SWeeT</h1>
            <p className="text-white mt-1">Decentralized Election as easy as it gets.</p>
            <a href="/TermsAndConditions" target="_blank" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 hover:scale-110 transition ease-in-out delay-100">&nbsp;&nbsp;&nbsp;Read More</a>
          </div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <div className="bg-white">
            <Image src={logo} className="scale-100 rounded-full px-8"></Image>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Login to your Account</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Please use your registered wallet Address to login.</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
                <p  type="text" name="address" id="" placeholder="User Address">
                &nbsp;{address.slice(0, 7)+"..........................................................."}</p>
            </div>
            <button onClick={()=>login()} className="block w-full bg-blue-500 hover:bg-blue-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
            {/* display error if voter didnt register yet */}
            <strong className="font-bold border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </strong>
            <h1 className="text-xl font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <a href="/Register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register Now.</a>
            </h1>
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

