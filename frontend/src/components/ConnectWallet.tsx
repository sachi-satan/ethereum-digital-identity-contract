import { useConnect } from "wagmi";

export function ConnectWallet() {
  const { connectors, connect } = useConnect();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Select Wallet</h2>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}
