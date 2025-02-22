import "./App.css";
import { useAccount } from "wagmi";
import { Account } from "./components/Account";
import { ConnectWallet } from "./components/ConnectWallet";

function App() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <ConnectWallet />;
}

export default App;
