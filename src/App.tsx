import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        <div>
        <iframe src="https://player.thetavideoapi.com/video/video_jk2mpjfp4crm7q6zh5g4vabjp8" 
   
        width="100%" 
        height="100%"
        />
        </div>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
