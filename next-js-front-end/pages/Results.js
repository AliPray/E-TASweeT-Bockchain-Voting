import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import UserNavBar from '../components/UserNavBar'
import Footer from '../components/Footer'
import ABI from "../constants/abi.json"
import {Line,Scatter,Bar,Bubble}  from "react-chartjs-2"
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import contractAdd from "../constants/contractAddress.json"



export default function Results() {
  

  const contractAddress = contractAdd.addr

  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("")
  const [voteTo, setVoteTo] = useState()
  const [lb, setLb] = useState([])
  const [dt, setDt] = useState([])
  const [registeredVoters, setRegisteredVoters] = useState(0)
  const [castedVotes, setCastedVotes] = useState(0)
  const[didntVote, setDidntVote] = useState()
  //error
  const[error, setError] = useState()


  const [showModal, setShowModal] = React.useState(false);


  
  useEffect(() => {
    returnElectionResult()
    returnNumbers()
    checkResults()
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
    connect()
    

  },[]);
  


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


  var options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };
  
  const data = {
    labels: lb,
    datasets: [
      {
        label: 'Votes per Candidate',
        backgroundColor: 'rgb(135, 206, 235)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: dt
      }
    ]
  }


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

  //function to return candidates with their votes.
  async function returnElectionResult(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

        const result = await contract.returnResult()
        
        let array = [] 
        const data = []
        const labels = []
        for(var i=0;i<result.length;i++){
          array.push([result[i][1],result[i][3].toNumber()])
          data.push(result[i][3].toNumber())
          labels.push(result[i][1])
        }
        console.log(array)
        setDt(data)
        setLb(labels)

      } catch (error) {
        console.log(error)
      }
    } 
    else {
       console.log("Please install MetaMask");
    } 
  }

  //get election status
  async function checkResults(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

        const checkStatus = await contract.getElectionStatus()
        if(!checkStatus){
          setError("Election results not out yet")
        }

      } catch (error) {
        console.log(error)
      }
    } 
    else {
       console.log("Please install MetaMask");
    }
  }

  //function to return number of registered voters and votes casted
  async function returnNumbers(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

        const registeredVoters = await contract.getVoterNumber()
        console.log(registeredVoters)
        const votesCasted = await contract.getCastedVotes()
        const val1=registeredVoters.toNumber()
        const val2=votesCasted.toNumber()
        setRegisteredVoters(val1)
        setCastedVotes(val2)
        const pplDidntVote = val1-val2
        if(pplDidntVote!=0){
          setDidntVote(pplDidntVote)
        }else{
          setDidntVote("")
        }
        

      } catch (error) {
        console.log(error)
      }
    } 
    else {
       console.log("Please install MetaMask");
    }
  }
  
  

  return (
    <div className="bg-blue-100 font-sans w-full min-h-screen m-0">
      <UserNavBar></UserNavBar>
      <div className="grid place-items-center">
            <h1 className="my-8 font-bold text-white-600 text-4xl">Election Results:</h1>
            <p className='text-2xl'>Registered voters 📑: {registeredVoters}</p>
            <p className='text-2xl'>votes casted ✅: {castedVotes}</p>
            <div class="p-4 mb-4 text-xl text-red-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
              <span class="font-medium ">Number of Non Voters 🔃: </span>{didntVote}
            </div>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">{error}</strong>
            </div>
      </div>
      <div className="border-8 border-blue-600 rounded-lg ">
        <Bar  options={options} data={data} />
      </div>
      <Footer></Footer>
    </div>
    )
}
