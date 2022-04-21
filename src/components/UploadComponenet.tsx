import { Textarea, Text, Box, Button, Flex, Spacer, Input, Select, Divider, toast, useToast, Icon } from "@chakra-ui/react"
import React, { useCallback, useState } from "react"
import { CopyIcon } from '@chakra-ui/icons'
import LoadingOverlay from 'react-loading-overlay-ts';
import GenerateEmbed from "./GenerateEmbed";
import UploadButton from "./UploadButton";
import { FiVideo, FiSend, FiHelpCircle} from 'react-icons/fi'
// @ts-ignore
export default function UploadVideo({ }) {
    let [value, setValue] = React.useState('')
    const toast = useToast()
    // @ts-ignore
    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)

    }

    const [isActive, setActive] = useState(false)
    const [isGenerated, setGenerated] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')
    const handleButtonClicked = useCallback(() => {
        setActive(value => !value)

        setTimeout(() => {
            setGenerated(true)
            setActive(value => !value)
            setVideoUrl("video_xxxxxxxxxxxxxxxxx")
            toast({
                title: `Video uploaded successfully`,
                status: 'success',
                isClosable: true,
            })
        }, 2000
        )


    }, [])

    function reset() {
        setGenerated(false)
        setActive(false)


    }

    return (
        <>
            <LoadingOverlay
                active={isActive}
                spinner
                text='Uploading Video please wait...'
                // @ts-ignore
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgba(26, 32, 44, 0.7)'
                    })
                }}
            >

                {!isGenerated ? <Box hidden={isGenerated} h={'200px'} paddingBottom={100} >
                    <Flex alignItems={'end'} flexDirection={
                        'column'
                    } justify="space-between" >
                        <Text color={'white'} fontSize='3xl' fontWeight={'bold'} >TheTangible Life - Digital Rights Management (Dapp)</Text>
                        <Spacer mt={'16px'} />
                        <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                            {/* create a button to for uploading file */}
                            {/* @ts-ignore */}

                            <UploadButton />

                        </Flex>
                        <Spacer mt={'8px'} />

                        <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                            <Text fontStyle={'italic'} color={'white'} mb='8px'>(Optional) Hash of any Required NFT (see how)  <Icon  color={'white'} h={6} w={6} as={FiHelpCircle} />
                            </Text>
                            {/* @ts-ignore */}
                           
                        </Flex>
                        <Spacer mt={'8px'} />
                        <Input padding={'4px'} variant='outline' placeholder='0x1234...' />



                        <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                            <Text color={'white'} mb='8px'>Video Dimensions:
                            </Text>
                        </Flex>

                        <Select padding={'4px'} placeholder='Select Dimension' size='md' borderRadius={'6px'}>
                            <option value='small'>640 x 480</option>
                            <option value='medium'>1280 x 960</option>
                            <option value='large'>1920 x 1080</option>
                        </Select>
                        <Spacer mt={'8px'} />


                        <Button
                            // isLoading
                            // loadingText='Submitting'

                            colorScheme='green'

                            onClick={handleButtonClicked}

                            justifyContent={'center'}
                        >
                            Submit
                        </Button>

                    </Flex>
                </Box>

                    : <GenerateEmbed videoUrl={videoUrl} />}






                <Flex hidden={!isGenerated} alignItems={'end'} direction={'column'} alignSelf="end">
                    <Button
                        // isLoading
                        // loadingText='Submitting'

                        colorScheme='red'
                        //@ts-ignore

                        justifyContent={'center'}
                        onClick={reset}>
                        Reset
                    </Button>
                </Flex>


                <Box hidden={!isGenerated}>

                    <Flex direction={'column'} alignItems={'center'}>
                        <Text fontSize='2xl' fontWeight={'bold'} color={'white'}>TheTangibleLife DRM</Text>
                        <Text fontSize='lg' color={'white'} >This video is only available to NFT owners of TheTangibleLife NFT</Text>

                        <Text fontSize='lg' >To unlock this video, please connect your wallet</Text>
                        <Button colorScheme={'green'} height="30px" > <Text fontSize='sm' fontWeight={'semibold'} color={'white'}>Connect Wallet</Text> </Button>
                    </Flex>


                </Box>

            </LoadingOverlay>

        </>
    )
}