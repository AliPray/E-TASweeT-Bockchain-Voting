import React from 'react'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import UserNavBar from '../components/UserNavBar'
import Footer from '../components/Footer'
import voterPic from "../assets/voterpic.png"
import { ethers } from 'ethers'
import ABI from "../constants/abi.json"
import contractAdd from "../constants/contractAddress.json"

export default function UserProfile() {
    


    const contractAddress = contractAdd.addr

    const[id, setId]= useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [state, setState] = useState()
    var [vote, setVote] = useState(null)
    const [icon, setIcon] = useState("")
    const [signer, setSigner] = useState()
    const [address, setAddress] = useState()


    useEffect(() => {
        //Runs on first render
        connect()
        getVoterDetails()
        
        
      });


      async function getVoterDetails(){
        if (typeof window.ethereum !== "undefined"){
            const abi = ABI
            const contract = new ethers.Contract(contractAddress, abi, signer);
      
            try {
              const voterInfo = await contract.getVoterinfo()
              var array = [];
                for(var i=0;i<voterInfo.length;i++){
                    array.push(voterInfo[i].toString());
                }
                setId(array[0]);
                setFirstName(array[1])
                setLastName(array[2])
                setState(array[3])
                if(array[4] == "true"){
                    setVote("voted already!")
                    setIcon("❌")
                }else if(array[4] == "false"){
                    setVote("you still can vote!")
                    setIcon("✅")
                }

            } catch (error) {
              
            }
      
          } else {
              console.log("Please install MetaMask");
          }
      }

      async function connect() {
        if (typeof window.ethereum !== "undefined") {
          try {
            await ethereum.request({ method: "eth_requestAccounts" });
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
    
    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <UserNavBar></UserNavBar>
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="relative">
                <div className="w-48 h-48 bg-sky-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-sky-500">
                <Image src={voterPic}></Image>
                </div>
                </div>
                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <h1 className="text-xl">Welcome back!</h1>
                </div>
            </div>

            <div className="mt-20 text-center border-b pb-12">
                <h1 className="text-4xl font-medium text-gray-700">Citizen Name: {firstName} {lastName}</h1>
                <h1 className="text-2xl font-small text-gray-700">CIN NUMBER: {id}</h1>
                <p className="font-light text-2xl text-gray-600 mt-3">State: {state}</p>
                <p className="font-bold text-2xl text-grey-600  mt-3">Voting Status: {vote}{icon}</p>
            </div>

            </div>
        </div>
        <Footer></Footer>
    </div>


  )
}
