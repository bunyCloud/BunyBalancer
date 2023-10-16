import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  injectedWallet,
  braveWallet,
  coinbaseWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  trustWallet,
  uniswapWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { coreWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
//import { telos, telosTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import App from "./App";

const projectId = "f95a49f83bc1ded0c992842132cbb0a3";

const dappName = "Buny Cloud";

const telosTestnet = {
  id: 41,
  name: 'Telos',
  network: 'telosTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Telos',
    symbol: 'TLOS',
  },
  rpcUrls: {
    default: { http: ['https://testnet15.telos.caleos.io/evm'] },
    public: { http: ['https://testnet.telos.net/evm'] },
  },
  blockExplorers: {
    default: {
      name: 'Teloscan (testnet)',
      url: 'https://testnet.teloscan.io/',
    },
  },
  iconUrls: ["https://static.crypto.com/token/icons/telos/color_icon.png"],

  testnet: true,
};

const CustomAvatar = ({ address, ensImage, size }) => {
  // Define the generateColorFromAddress function here
  return ensImage ? (
    <img
      src={ensImage} // Use the provided ensImage if available
      alt={`Avatar for ${address}`}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }} // Use '50%' to make the image round
    />
  ) : (
    <img
      src="/buny-bw2.png" // Set the path to your static image in the public folder
      alt={`Avatar for ${address}`}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }} // Use '50%' to make the image round
    />
  );
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    telosTestnet,
        ...(process.env.REACT_APP_ENABLE_TESTNETS === "true" ? [telosTestnet] : []),
  ],
  [publicProvider()],
);


const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      coreWallet({ projectId, chains }),
      braveWallet({ chains }),
      coinbaseWallet({ dappName, chains }),
      metaMaskWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
      uniswapWallet({ projectId, chains }),
      phantomWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// Use ReactDOM.render if you're not on React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        coolMode
        avatar={CustomAvatar}
        showRecentTransactions={true}
        chains={chains}
      >
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);

reportWebVitals();
