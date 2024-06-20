import React from 'react'
import UserNavBar from '../components/UserNavBar'
import candidatePic from "../assets/candidatepic.png"
import Image from 'next/image'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers' 
import ABI from "../constants/abi.json"
import contractAdd from "../constants/contractAddress.json"






export default function VoteContent() {

  
  useEffect(() => {
    returnCandidatesInfo()
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
    connect()
    

  },[]);
  

  const contractAddress = contractAdd.addr

  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("")
  const [candidateInfo, setCandidateInfo] = useState(null)
  const [voteTo, setVoteTo] = useState()
  const[error, setError] = useState()
  

  const [showModal, setShowModal] = React.useState(false);


  
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

  async function returnCandidatesInfo(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

        const result = await contract.returnCandidates()
        let array = [] 
        for(var i=0;i<result.length;i++){
          array.push([result[i][0].toNumber(),result[i][1],result[i][2]])
        }
        setCandidateInfo(array)

      } catch (error) {
        console.log(error);
      }
      } else {
        console.log("Please install MetaMask");
      }
  }

  async function castVote(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
       var checkElection = await contract.getElectionStatus()
       const vote = parseInt(voteTo)
       await contract.vote(vote)
       setShowModal(false)
       localStorage.setItem("vote",true)

      } catch (err) {
        if(checkElection==false)
        setError("Election hasn't started yet!")
        else{
          setError("You have already casted your vote!")
        }
      
      }
      } else {
        console.log("Please install MetaMask");
      }
  }
  
  

  //get button value to cast vote,
  const handleClick = (evt) => {
    setVoteTo(evt)
    setShowModal(true)
  }
  
  return (
    <div>
      
      <div className="bg-blue-100 font-sans w-full min-h-screen m-0">
          <UserNavBar></UserNavBar> 
          <div className="grid place-items-center">
            <h1 className="my-8 font-bold text-white-600 text-4xl">choose your candidate:</h1>
          </div>
          <div className='mx-5 grid grid-cols-4 gap-10 '>

          {candidateInfo && candidateInfo.map(item=>(

            
              <div className ="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className ="flex justify-end px-4 pt-4">
                  </div>
                  <div className ="flex flex-col items-center pb-10">
                      <div className="w-40 h-40">
                        <Image className =" scale-50 mb-3 rounded-full shadow-lg" src={candidatePic} alt="candidate picture"/>
                      </div>
                      <h5 className ="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item[1]}</h5>
                      <span className ="text-m font-medium text-gray-500 dark:text-gray-400">{item[2]}</span>
                      <span className ="text-xl text-gray-500 dark:text-gray-400">vote now for n°: {item[0]}</span>
                      <div className ="flex mt-4 space-x-3 md:mt-6">
                        <button type="button" onClick={()=>handleClick(item[0])} className ="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Vote Now</button>
                      </div>
                      <div>
                       {/* show the popup modal   */}
                      <>
                        {showModal ? (
                          <>
                            <div
                              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                  {/*header*/}
                                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                      Vote Confirmation for candidate: {voteTo}
                                    </h3>
                                    <button
                                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                      onClick={() => setShowModal(false)}
                                    >
                                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                      </span>
                                    </button>
                                  </div>
                                  {/*body*/}
                                  <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                      By reading this, I confirm that I will cast my one and only vote to candidate {voteTo}
                                    </p>
                                    <h1 className="my-4 text-slate-500 text-lg leading-relaxed">
                                      Please press "Confirm Vote" to cast the vote!
                                    </h1>
                                    <p class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                                      {error} 
                                    </p>
                                  </div>
                                  {/*footer*/}
                                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                    >
                                      Close
                                    </button>
                                    <button
                                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => castVote()}
                                    >
                                      Confirm Vote
                                    </button>                              
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                          </>
                        ) : null}
                      </>
                  
                      </div>
                  </div>
              </div>

            
          ))}
                          
          </div>

      </div>

      <Footer></Footer>
    </div>
  )
}



//  {/* candidate card */}
//  {candidateInfo && candidateInfo.map(item=>(
                
//   ))}