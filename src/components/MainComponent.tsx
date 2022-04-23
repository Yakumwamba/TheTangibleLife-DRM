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


        <UploadVideo />

</Layout>
   
    </>
  )
}


