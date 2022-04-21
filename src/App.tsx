import { Box, Center, ChakraProvider, Heading, useDisclosure, Text, Button } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";
import GenerateEmbed from "./components/GenerateEmbed";
import UploadVideo from "./components/UploadComponenet";
import { title } from "process";
import { useEthers, useEtherBalance, useContractFunction } from "@usedapp/core";
import React from "react";
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // usestate for uploaded 
  const [uploaded, setUploaded] = React.useState(false);
  const { activateBrowserWallet, account } = useEthers()

  function handleConnectWallet() {
    activateBrowserWallet();
  }
  // @ts-ignore
  function uploadCallback() {
    setUploaded(true);
  };
  return (
    <ChakraProvider theme={theme}>
      <Layout>

        <Box h={'10%'} w={'100'} alignSelf={'center'} p={4} >
          <ConnectButton handleOpenModal={onOpen} handleConnectWallet={handleConnectWallet} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Box>

        {/* <div>
          <iframe src="https://player.thetavideoapi.com/video/video_jk2mpjfp4crm7q6zh5g4vabjp8"
            width="100%"
            height="100%"
          />
        </div> */}
 
        {uploaded ? < GenerateEmbed /> : <UploadVideo />}
      
      
      

      </Layout>
    </ChakraProvider>
  );
}

export default App;
