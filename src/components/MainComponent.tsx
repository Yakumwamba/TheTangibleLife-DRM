import { Box, useDisclosure } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React from 'react'
import AccountModal from './AccountModal'
import ConnectButton from './ConnectButton'
import Layout from './Layout'
import UploadVideo from './UploadComponenet'

export default function MainComponent() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { activateBrowserWallet, account } = useEthers()
    function handleConnectWallet() {
        activateBrowserWallet();
      }
      

  return (
    <>
    <Layout>

    <Box w={'100'} alignSelf={'center'} p={4} >
          <ConnectButton handleOpenModal={onOpen} handleConnectWallet={handleConnectWallet} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Box>

        {/* <div>w3w
          <iframe src="https://player.thetavideoapi.com/video/video_jk2mpjfp4crm7q6zh5g4vabjp8"
            width="100%"
            height="100%"
          />we
        </div> */}

        <UploadVideo />

</Layout>
   
    </>
  )
}


