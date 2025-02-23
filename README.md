# Ethereum Digital Identity Contract

This project demonstrates the integration of a Digital Identity smart contract with a React frontend application.

## Built With

- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [Ignition](https://www.trufflesuite.com/docs/truffle/advanced/ignition) - Smart contract deployment

## Getting Started

To get this project running locally, follow these steps.

### Prerequisites

To run this project you need:

- Node.js (v18 or later recommended)
- npm or yarn package manager
- A wallet like MetaMask installed in your browser
- Access to an Ethereum network (local or testnet)

## Quick Start

Follow these steps to run the project locally:

1. Clone the repository and install dependencies for the smart contract:

   ```sh
   cd contract
   npm install
   ```

2. Start a local Hardhat node in a separate terminal:

   ```sh
   npx hardhat node
   ```

3. Deploy the smart contract to localhost:

   ```sh
   npx hardhat compile
   npx hardhat ignition deploy ./ignition/modules/DigitalIdentity.ts --network localhost
   ```

   After deployment, note down the contract address that will be used in the frontend.

4. Generate TypeChain typings for the frontend:

   ```sh
   npx hardhat typechain
   ```

   This will generate TypeScript typings for your smart contracts that can be used in the frontend.

5. Set up the frontend:

   ```sh
   cd ../frontend
   npm install
   ```

6. Create a `.env` file in the frontend directory and add the deployed contract address:

   ```sh
   VITE_CONTRACT_ADDRESS=<your-deployed-contract-address>
   ```

7. Start the frontend development server:

   ```sh
   npm run dev
   ```

The application should now be running at `http://localhost:5173`

## Project Structure

- `/contract` - Smart contract code and deployment configuration

  - `/contracts` - Solidity smart contracts
  - `/ignition` - Deployment modules
  - `/test` - Contract test files

- `/frontend` - React frontend application
  - `/src/components` - React components
  - `/src/components/identity` - Digital Identity related components

## License

This project is open source and available under the MIT License.
