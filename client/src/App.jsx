import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import FooterMain from "./components/FooterMain";
import IncreasePosition from "./components/GMX/IncreasePosition";
import { useAccount } from "wagmi";
import PriceFeed from "./components/GMX/PriceFeed";
import ActionsList from "./components/GMX/ActionsList";
import { Center, VStack } from "@chakra-ui/react";


function App() {
  const [chainId, setChainId] = useState(41);
  const [account, setAccount] = useState("");
  const { address, isConnected } = useAccount()

  const [rpcUrl, setRpcUrl] = useState("https://testnet15.telos.caleos.io/evm");


  useEffect(() => {
    //*
  if(address){
    setAccount(address);
    console.log(`Address saved to context ${account}`)
  }
}, [account, address])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 12 }}>
        <NavBar />
      </div>
      <div style={{ height: '75vh', backgroundColor:'ThreeDFace', display: 'flex', flexDirection: 'column' }}>
      </div>

      <div style={{padding:'8px', border:'0.5px solid ThreeDFace'}}>
        <Center>
        <VStack>
        <PriceFeed />
        <div style={{width:'350px', padding:'8px'}}>
     <IncreasePosition account={account} />
     </div>
     </VStack>
        </Center>
      </div>
      <div style={{padding:'8px', border:'0.5px solid ThreeDFace'}}>
        
      </div>

      <FooterMain style={{ flexShrink: 0, position: 'sticky', bottom: 0 }} />
    </div>

  );
}

export default App;
