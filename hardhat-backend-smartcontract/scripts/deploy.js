// imports 
const { ethers, run, network } = require("hardhat")



//async main
async function main(){
   const ElectionFactory = await ethers.getContractFactory("Election") 

   console.log("Deploying contract...")
   const election = await ElectionFactory.deploy()  
   await election.deployed()

   //what's the private key?
   //what's the rpc url?
   console.log(`Deployed Contract to: ${election.address}`)

   //what happens when we deploy to our hardhat network ? 
  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
    //wait for 6 blocks to be mined before verifying the contract.
    await election.deployTransaction.wait(6)
    await verify(election.address, [])
  }


  //how to read data from the contract
  const candidateNum = await election.getCandidatesNumber();
  console.log(`number of candidates: ${candidateNum}`)
  const voterNum = await election.getVoterNumber();
  console.log(`number of voters: ${voterNum}`)
  const candidates = []
  for (let i = 1; i <= candidateNum; i++){
    candidates.push(await election.getCandidateInfo(i))
  }
  for (let i = 0; i < candidateNum; i++){
    console.log(`candidate ${i+1}: ${candidates[i]}`)
  }

  
  //update data from the contract
  //const transactionResponse = await election.Add


  

} 
//function to verify contract in the blockchain network
async function verify(contractAddress, args){
  console.log("Verifying Contract...")
  
  try{
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch(e){
    if(e.message.toLowerCase().includes("Already verified!")){
      console.log("Already Verified!")
    }
    else{
      console.log(e)
    }
  }
}

 

//main
main()
   .then(() => process.exit(0))
   .catch((error) => {
     console.error(error);
     process.exit(1);
   });
