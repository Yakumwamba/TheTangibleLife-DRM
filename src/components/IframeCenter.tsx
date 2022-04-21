import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function IframeCenter() {
    return (
        <>
            <Box>

                <Flex direction={'column'} alignItems={'center'}>
                    <Text fontSize='2xl' fontWeight={'bold'} color={'white'}>TheTangibleLife DRM</Text>
                    <Text fontSize='lg' color={'white'} >This video is only available to NFT owners of TheTangibleLife NFT</Text>

                    <Text fontSize='lg' >To unlock this video, please connect your wallet</Text>
                    <Button colorScheme={'green'} height="30px" > <Text fontSize='sm' fontWeight={'semibold'} color={'white'}>Connect Wallet</Text> </Button>
                </Flex>


            </Box>

        </>
    )
}
