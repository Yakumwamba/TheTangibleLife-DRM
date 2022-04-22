import { Textarea, Text, Box, Button, Flex, Spacer, Input, Select, Divider, toast, useToast, Icon, Link } from "@chakra-ui/react"
import React, { useCallback, useState } from "react"
import { CopyIcon } from '@chakra-ui/icons'
import LoadingOverlay from 'react-loading-overlay-ts';
import GenerateEmbed from "./GenerateEmbed";
import UploadButton from "./UploadButton";
import { FiVideo, FiSave, FiHelpCircle } from 'react-icons/fi'
// @ts-ignore
import { useLocation } from "react-router-dom";
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

  

    const handleButtonClicked = useCallback(() => {
        setActive(value => !value)

        setTimeout(() => {

            setActive(value => !value)
            ///setVideoUrl("video_xxxxxxxxxxxxxxxxx")
            toast({
                title: `Video uploaded successfully`,
                status: 'success',
                isClosable: true,
            })

        }, 2000
        )


    }, [])

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


                <Flex alignItems={'end'} flexDirection={
                    'column'
                } width="100%" justify="space-between" >
                    <Text color={'white'} fontSize='3xl' fontWeight={'bold'} >TheTangible Life - Digital Rights Management </Text>
                    <Spacer mt={'16px'} />
                    <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                        {/* create a button to for uploading file */}
                        {/* @ts-ignore */}

                        <UploadButton />

                    </Flex>
                    <Spacer mt={'8px'} />

                    <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                        <Text fontStyle={'italic'} color={'white'} mb='8px'>(Optional) Hash of any Required NFT (see how)  <Icon color={'white'} h={6} w={6} as={FiHelpCircle} />
                        </Text>
                        {/* @ts-ignore */}

                    </Flex>
                    <Spacer mt={'8px'} />
                    <Input padding={'4px'} textColor={'white'} variant='outline' placeholder='0x1234...' />



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
                        rightIcon={<Icon color={'white'} h={6} w={6} as={FiSave} />}
                        colorScheme='green'

                        //onClick={requestPresignedUrl}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        justifyContent={'center'}
                        fontWeight={'semibold'}
                    >
                        {/* <Link href='/generated-iframe' >Submit </Link> */}
                    </Button>
                    <Spacer mt={'8px'} />
                    <Button
                        // isLoading
                        // loadingText='Submitting'
                        rightIcon={<Icon color={'white'} h={6} w={6} as={FiSave} />}
                        colorScheme='green'
                        // @ts-ignore
                        // onClick={uploadVideoViaPresignedUrl}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        justifyContent={'center'}
                        fontWeight={'semibold'}
                    >
                        {/* <Link href='/generated-iframe' >Submit </Link> */} Upload
                    </Button>



                    {/* <Text color={'white'}>{videoId}</Text> */}

                </Flex>





            </LoadingOverlay>

        </>
    )
}