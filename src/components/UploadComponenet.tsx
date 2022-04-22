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
                    <Text color={'white'} fontSize='3xl' alignSelf={'start'} w={'500px'} fontWeight={'bold'} >TheTangible Life - NFT-based Video Streaming </Text>
                    <Text color={'white'} fontSize='sm' w={'300px'} alignSelf={'start'} fontWeight={'semibold'} >This dapp allows you to generate embed code for NFT-based video streaming </Text>
                    <Spacer mt={'16px'} />
                    <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                        {/* create a button to for uploading file */}
                        {/* @ts-ignore */}

                        <UploadButton />

                    </Flex>
                    <Spacer mt={'8px'} />



                
                    



                    {/* <Text color={'white'}>{videoId}</Text> */}

                </Flex>





            </LoadingOverlay>

        </>
    )
}