import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { sepolia } from "wagmi/chains";
import "@/styles/globals.css"

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    appName: "eVault",
    chains: [sepolia]
  }),
);

const App = ({ Component }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Component />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;