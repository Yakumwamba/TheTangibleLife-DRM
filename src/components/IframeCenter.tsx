import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core';
import React, { useEffect } from 'react'

export default function IframeCenter() {

    const { activateBrowserWallet, account } = useEthers();
    function handleConnectWallet() {
        activateBrowserWallet();
        console.log(account);
    }
    useEffect(() => {
        console.log(account);

    }, [account])

    return (
        <>
            <Box>
                {!account ? <Flex direction={'column'} alignItems={'center'}>
                    <Text fontSize='2xl' fontWeight={'bold'} color={'white'}>TheTangibleLife DRM</Text>
                    <Text fontSize='lg' color={'white'} >This video is only available to NFT owners of TheTangibleLife NFT</Text>

                    <Text fontSize='lg' >To unlock this video, please connect your wallet</Text>
                    <Button onClick={handleConnectWallet} colorScheme={'green'} height="30px" > <Text fontSize='sm' fontWeight={'semibold'} color={'white'}>Connect Wallet</Text> </Button>
                </Flex> : <Flex direction={'column'} alignItems={'center'}>
                    <Text fontSize='2xl' fontWeight={'bold'} color={'white'}> You are connected</Text>
                    <Text fontSize='sm' fontWeight={'bold'} color={'white'}> {account}</Text>

                    <Box>
                     
                        <iframe src="https://player.thetavideoapi.com/video/video_i32nq3tn23fia0br5cb4x90ir3"
                           /* @ts-ignore */
                            border="0"
                            width="100%"
                            height="100%"
                            allowfullscreen />
                    </Box>
                </Flex>}



            </Box>

        </>
    )
}
