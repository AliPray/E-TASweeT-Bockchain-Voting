/**
* @type import(‘hardhat/config’).HardhatUserConfig
*/

require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
 

 const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY, COINMARKETCAP_API_KEY } = process.env
 module.exports = {
    solidity: "0.8.9", 
    gasReporter:{
      enabled: true,
      outputFile:"gas-report.txt",
      noColors: true,
      currency: "TND", //for Tunsisian dinar , MYR for malaysian ringgit, USD for united states dollar
      coinmarketcap: COINMARKETCAP_API_KEY,
    }, 
    defaultNetwork: "hardhat", 
    networks: {    
      hardhat: {},   
      sepolia: {     
       url: API_URL,      
       accounts: [`0x${PRIVATE_KEY}`],   
      } 
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      //accounts
      chainId: 31337,
    },
    etherscan:{
      apiKey: ETHERSCAN_API_KEY,
    }
 };