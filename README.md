## E-TASWeeT-blockhain-voting
![alt text](./next-js-front-end/assets/show1.png)
## Project Setup Guide

This guide will walk you through setting up and running the project, including deploying the smart contract and starting the front-end application.

## Extract the Project File

1. Extract the project file.

## Backend Setup

### Step 1: Navigate to the Backend Folder

1. Once inside the project's folder, you will find two subfolders: `hardhat-backend-smartcontract` and `next-js-front-end`.
2. Open the `hardhat-backend-smartcontract` folder with Visual Studio Code.

### Step 2: Configure Environment Variables

1. Locate and open the `.env` file.
2. Copy and paste the private key you obtained from the MetaMask instructions into the `.env` file.
3. (Optional) Obtain API keys for Etherscan and CoinMarketCap:
   - [CoinMarketCap API Key](https://coinmarketcap.com/)
   - [Etherscan API Key](https://etherscan.io/)

### Step 3: Deploy the Smart Contract

1. Open the terminal in Visual Studio Code.
2. Change directory to `hardhat-backend-smartcontract`:
   ```sh
   cd hardhat-backend-smartcontract
   ```
3. Run the following scripts to compile and deploy the smart contract:
   ```sh
   yarn hardhat compile
   yarn hardhat run ./scripts/deploy.js --network sepolia
   ```
4. Wait for the success message in the terminal.
5. (Optional) Verify the smart contract:
   ```sh
   yarn hardhat verify --network sepolia
   ```
6. After deployment, you will see the smart contract address in the terminal. Follow the provided link to [Etherscan](https://sepolia.etherscan.io/).
7. Copy your smart contract address, paste it into the Etherscan search bar, and press enter.
8. Scroll down to find the ABI code.

## Frontend Setup

### Step 1: Navigate to the Frontend Folder

1. Open the `next-js-front-end` folder with Visual Studio Code.

### Step 2: Update the Smart Contract Address

1. Locate the `constants` folder.
2. Replace the old smart contract address with the new one in the appropriate file (ensure the address is enclosed in quotation marks).

### Step 3: Start the Frontend Application

1. Open the terminal and change directory to `next-js-front-end`:
   ```sh
   cd next-js-front-end
   ```
2. Run the following commands:
   ```sh
   yarn
   yarn dev
   ```
3. Wait for the system to start on `localhost`.
4. Open your browser and navigate to [http://localhost:3000/](http://localhost:3000/).
5. Access the admin side using your MetaMask account at [http://localhost:3000/AdminLogin](http://localhost:3000/AdminLogin).

### Additional Information

- You can add multiple accounts to your main MetaMask account to test by registering voters and casting votes with them.
- Contact me if you need Ether for your wallet, or use the mining link provided in the first section.

## Contact

If you need assistance or have any questions, please reach out.

---

This README provides a step-by-step guide to setting up and running the project, including both backend and frontend configurations. Make sure to follow each step carefully to ensure a smooth setup process.