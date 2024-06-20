import React from 'react'
import AdminNavBar from '../components/AdminNavBar'
import Footer from '../components/Footer'
import ABI from "../constants/abi.json"
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import contractAdd from "../constants/contractAddress.json"



export default function AddCandidate() {
  

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  },[])

  useEffect(()=>{
    connect()
  },[])

  async function registerCandidate(){
    if(inputs.id =="" || inputs.cName=="" || inputs.cParty==""){
      setError("please fill in all the details! ⚠️")
    }else{

      if (typeof window.ethereum !== "undefined"){
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
          
          await contract.addCandidate(inputs.id,inputs.cName,inputs.cParty)
          setError(`Succesfully added candidate number ${inputs.id} to the elections! ✅`)
  
        } catch (error) {
          setError(`candidate number ${inputs.id} is already registered to the elections! ❌`)
        }
      } else {
          console.log("Please install MetaMask");
      }

    }
  }


  const contractAddress = contractAdd.addr
  const abi = ABI
  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);


  const [inputs, setInputs] = useState({
    id:0,
    cName: "",
    cParty:"",
  })
  const [error, setError] = useState()

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

  const handleInputChange =  (evt) => {
    const value = evt.target.value;
    setInputs({
      ...inputs,
      [evt.target.name]: value
    });
    console.log(inputs)
  }




  return (

    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <AdminNavBar></AdminNavBar>
        <div className=" mt-10 ml-10">
        </div>
        <div className="p-16">
          <div className="p-8 bg-white shadow ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-sky-100">
          <div className="grid place-items-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register candidates to the election📘:
            </h1>
          </div>
          <div className="space-y-4 md:space-y-6">
              <div>
                  <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Candidate Number:</label>
                  <input onChange={handleInputChange} type="number" name="id"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Candidate's CIN here" required=""></input>
              </div>
              <div>
                  <label for="cname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Candidate full Name:</label>
                  <input onChange={handleInputChange} type="name" name="cName"   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Candidate's Full Name here" required=""></input>
              </div>

              <div>
                  <label for="party" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Party Name:</label>
                  <input onChange={handleInputChange} type="name" name="cParty"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Candidate's Party Name here" required=""></input>
              </div>
              <div className="flex items-center text-sm font-bold px-4 py-3" role="alert">
                <svg className="bg-blue-500 rounded-full fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p className=' text-black-500 text-sm font-bold'>{error}</p>
              </div>
              <button onClick={()=>registerCandidate()} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Candidate</button>
          </div>
      </div>

          </div>
        </div>
        <Footer></Footer>
        
    </div>
  )
}
