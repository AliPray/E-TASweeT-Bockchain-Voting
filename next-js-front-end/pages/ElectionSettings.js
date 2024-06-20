import React from 'react'
import AdminNavBar from '../components/AdminNavBar'
import {useEffect, useState} from "react"
import ABI from "../constants/abi.json"
import { ethers } from 'ethers'
import Footer from '../components/Footer'
import contractAdd from "../constants/contractAddress.json"




export default function ElectionSettings() {


  //contract address;
  const contractAddress = contractAdd.addr
  const abi = ABI

  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);


  const [candidatesNumber, setCandidatesNumber] = useState("0") 
  const [votersNumber, setVotersNumber] = useState("0")
  const [electionStatus,setElectionStatus] = useState(null)
  const[resultStatus, setResultStatus] = useState(null)

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
         //get wallet addres
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts[0]);
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
       
       
        

      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }


  async function getNumbers(){
    if (typeof window.ethereum !== "undefined"){
      try{
        await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
      } catch(e){
        console.log(e)
      }
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const numOfCan = (await contract.getCandidatesNumber()).toNumber()
        const numOfVot = (await contract.getVoterNumber()).toNumber()

        console.log(numOfCan)
        console.log(numOfVot)
        setCandidatesNumber(numOfCan)
        setVotersNumber(numOfVot)
      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }

  
  async function getElectionStatus(){
    if (typeof window.ethereum !== "undefined"){
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
        const status = await contract.getElectionStatus()
        if(status){
          setElectionStatus("ELECTION ON")
        }else{
          setElectionStatus("ELECTION OFF")
        }
        

      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }

  async function getResultStatus(){
    if (typeof window.ethereum !== "undefined"){
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
        const status = await contract.getResultStatus()
        if(status){
          setResultStatus("RESULT ON")
        }else{
          setResultStatus("RESULT OFF")
        }
        

      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }

  
  async function triggerElection(){
    if (typeof window.ethereum !== "undefined"){

      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
        await contract.triggerElection()
        setTimeout(getElectionStatus, 20000);
        
      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }
  
  async function triggerResult(){
    if (typeof window.ethereum !== "undefined"){

      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
        await contract.triggerResult()
        setTimeout(getResultStatus, 20000);
        
      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }


  useEffect(() => {
    //Runs on first render
    getNumbers()
    getElectionStatus()
    getResultStatus()
  }),[];
  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  },[])

  useEffect(()=>{
    connect()
  },[])


  return (
    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <AdminNavBar></AdminNavBar>
        <div className="p-16">
          <div className="p-8 bg-white shadow ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-sky-100">
          <div className="flex flex-col space-y-4 place-items-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Current Stats of the election:
            </h1>
            <p className="text-xl">Number of Candidates: {candidatesNumber} </p>
            <p className="text-xl">Number of Voters: {votersNumber}</p>
            <button onClick={()=>triggerElection()}className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              {electionStatus}⚙️
            </button>
            <button onClick={()=>triggerResult()}className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              {resultStatus}⚙️
            </button>

          </div>
       </div>

          </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
