import React from 'react'
import Image from 'next/image'
import logo from "../assets/logo.png"
import {useEffect, useState} from "react"
import Footer from '../components/Footer'
import InstallMetaMask from '../components/InstallMetaMask'
import metamasklogo from '../assets/metamasklogo.png'
import { ethers } from 'ethers'
import ABI from "../constants/abi.json"
import contractAdd from "../constants/contractAddress.json"


export default function Register() {

  const contractAddress = contractAdd.addr
  
   //states for checking metamask in borwser, connected, and set the singer form the connected wallet
   const [isConnected, setIsConnected] = useState(false)
   const [hasMetamask, setHasMetamask] = useState(false);
   const [signer, setSigner] = useState(undefined);
   const [address, setAddress] = useState("")
   
   const[error, setError] = useState()

   const [showModal, setShowModal] = React.useState(false);


  //other states
  const [citizen, setCitizen] = useState([])
  const [inputs, setInputs] = useState({
    id:0,
    fName: "",
    lName:"",
    state:"",
  })

    //function to fetch the voter from the citizens database (mongodb)
    const fetchCitizen = async () => {
        const response = await fetch(`/api/citizens/${inputs.id}`);
        const res = await response.json();

        let number = inputs.id 
        number = parseInt(number)  

        try{
          if(number == res[0].voterId && inputs.fName == res[0].firstName 
            && inputs.lName == res[0].lastName && inputs.state == res[0].state){
            register()
          }else{
            setError("Please put your exact information!")
          }
        }catch(error){
          setError("Please put your exact information!")
        }
    }

    //registration function:
  async function register(){
    if (typeof window.ethereum !== "undefined"){
      const abi = ABI
      const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            await contract.addVoter(inputs.id,inputs.fName,inputs.lName,inputs.state)
            window.location.href = '/';  

        } catch (error) {
          setError("Id/Address already registered to the elections!")
          
        }

    } else {
        console.log("Please install MetaMask");
    }
  }


  const [checked, setChecked] = useState(false)

  //change the checkbox status
  const handleClick = () => {
    setChecked(!checked)
    console.log(checked)
  }

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
        var userAdd = accounts[0];
        setAddress(userAdd)
        console.log(signer)
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }


  //function hadnle input changes and update the states
  const handleInputChange =  (evt) => {
    const value = evt.target.value;
    setInputs({
      ...inputs,
      [evt.target.name]: value
    });
    console.log(inputs)
  }

//get button value to cast vote,
const handleClickButton = () => {
  if(checked && inputs.id!="" && inputs.fName!="" && inputs.lName!="" && inputs.state!=""){
    setError("")
    setShowModal(true)
  }else{
    setError("please put all your information and  check the box ✔️ to agree to the terms of use!")
  }
}

const closeButton = () =>{
  setError("")
  setShowModal(false)
}



  
  return (
    <div>
      
      {hasMetamask ? (
      isConnected ? (
        <div className=" grid h-screen place-items-center">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-sky-100 ">
              <div className="grid place-items-center">
                <Image src={logo} className="object-scale-down h-40 w-40 rounded-full shadow-lg"></Image>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an Account
                </h1>
              </div>
              
              {/* register form */}
              <div className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wallet Address:</label>
                      <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="address" id="" placeholder="User Address">
                        {address.slice(0, 7)+"...."}</p>
                  </div>
                  <div>
                      <label for="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Citizen Identity Card Number (CIN):</label>
                      <input onChange={handleInputChange} type="number" name="id" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your CIN here" required=""></input>
                  </div>
                  <div>
                      <label for="fName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
                      <input onChange={handleInputChange} type="name" name="fName" id="fName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your first Name here" required=""></input>
                  </div>
                <div>
                      <label for="lName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
                      <input onChange={handleInputChange} type="name" name="lName" id="lName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your last name here" required=""></input>
                  </div>
                  <label for="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select State:</label>
                  <select onChange={handleInputChange} name="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="no state" selected>please select your state:</option>
                      <option value="Monastir">Monastir</option>
                      <option value="Sousse">Sousse</option>
                      <option value="Mahdia">Mahdia</option>
                  </select>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input onClick={handleClick} checked={checked} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/TermsAndConditions" target="_blank">Terms and Conditions of use.</a></label>
                      </div>
                  </div>
                  <div class="flex items-center text-red text-l font-bold px-4 py-3" role="alert">
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p>{error}</p>
                  </div>
                  <button onClick={()=>handleClickButton()} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/"  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login from here.</a>
                  </p>
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
                                       Registration confirmation
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
                                      By reading this, I confirm that I will register to the elections.                                    </p>
                                    <h1 className="my-4 text-slate-500 text-lg leading-relaxed">
                                      Please press "Register Now" to register to the elections!
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
                                      onClick={() => closeButton()}
                                    >
                                      Close
                                    </button>
                                    <button
                                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => fetchCitizen()}
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
          
          <div className="w-full">
            <Footer></Footer>
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
