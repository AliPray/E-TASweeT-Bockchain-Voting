import React from 'react'
import {useEffect, useState} from "react"
import { ethers } from 'ethers'


function test() {

    const contractAddress = "0x00211e693b79676680749Ad83B0Db467D4c4cf78"
    const abi = [{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"ApprovedByQA","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"DeliveredByDistributor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"DeliveredByManufacturer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"DeliveredByQA","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"Manufactured","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"PurchasedByRetail","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"ReceivedByDistributor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"ReceivedByQA","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"uid","type":"uint256"}],"name":"ReceivedByRetail","type":"event"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addManufacturer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addQualityAssurance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addRetail","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"deliverToDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"deliverToQA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"deliverToRetail","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"},{"internalType":"string","name":"dist_Company","type":"string"},{"internalType":"string","name":"dist_Location","type":"string"}],"name":"distReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"fetchManufacturerInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fetchProductCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"fetchProductHistoryLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"fetchProductInfo","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"enum Structure.States","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"fetchProductState","outputs":[{"internalType":"enum Structure.States","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"fetchQAandDis","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"fetchRetailInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isDistributor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isManufacturer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isQualityAssurance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isRetail","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"manufacturerName","type":"string"},{"internalType":"string","name":"manufacturerLocation","type":"string"},{"internalType":"string","name":"productname","type":"string"},{"internalType":"uint256","name":"productSerial","type":"uint256"},{"internalType":"uint256","name":"productPrice","type":"uint256"},{"internalType":"uint256","name":"productQty","type":"uint256"}],"name":"manufactureProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"prod_UID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"qaApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"},{"internalType":"string","name":"qa_Company","type":"string"},{"internalType":"string","name":"qa_Location","type":"string"}],"name":"qaReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"retailPuchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_uid","type":"uint256"}],"name":"retailReceive","outputs":[],"stateMutability":"nonpayable","type":"function"}]

   const [signer, setSigner] = useState(undefined);
   const [address, setAddress] = useState("")
   const [isConnected, setIsConnected] = useState(false)
   const [hasMetamask, setHasMetamask] = useState(false);
   
   const[error, setError] = useState()


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

   async function getProductInfo() {
    if (typeof window.ethereum !== "undefined") {
      const smartContract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      try {
        const getValues = await smartContract.functions.fetchProductCount();

        console.log(getValues);
      } catch (error) {
        console.log("errorer", error);
      }
    } else {
      console.log("Please install Metamask");
    }
  }


  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
      connect()

    }
  },[]);


  return (
    <div>
        <button className="bg-green-100" onClick={()=>getProductInfo()}>button</button>
    </div>
  )
}

export default test