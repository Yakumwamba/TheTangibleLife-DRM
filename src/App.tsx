import { Box, Center, ChakraProvider, Heading, useDisclosure, Text, Button } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";


import { title } from "process";
import { useEthers, useEtherBalance, useContractFunction } from "@usedapp/core";
import React from "react";

import UploadVideo from "./components/UploadComponenet";
import MainComponent from "./components/MainComponent";
import { Route, Routes } from "react-router-dom";
import IframeCenter from "./components/IframeCenter";
import GenerateEmbedCode from "./components/GenerateEmbed";
function App() {
  
  // usestate for uploaded 
  const [uploaded, setUploaded] = React.useState(false);



  // @ts-ignore
  function uploadCallback() {
    setUploaded(true);

  };
  return (
    <ChakraProvider theme={theme}>
      <Layout>

      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/tangible-life" element={<IframeCenter />} />
        <Route path="/generated-iframe" element={<GenerateEmbedCode videoUrl={''} />} />
      </Routes>

      </Layout>
    </ChakraProvider>
  );
}

export default App;
