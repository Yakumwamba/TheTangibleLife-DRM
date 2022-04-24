import { Textarea, Text, Box, Button, Flex, Spacer, Input, Select, Divider, toast, useToast, Icon, Link } from "@chakra-ui/react"
import React, { useCallback, useState } from "react"
import { CopyIcon } from '@chakra-ui/icons'

import GenerateEmbed from "./GenerateEmbed";
import UploadForm from "./UploadForm";
import { FiVideo, FiSave, FiHelpCircle } from 'react-icons/fi'
// @ts-ignore
import { useLocation } from "react-router-dom";
// @ts-ignore
export default function UploadVideo({ }) {
    let [value, setValue] = React.useState('')

    const toast = useToast()
    // @ts-ignore


    return (
        <>
          
                <Flex alignItems={'end'} flexDirection={
                    'column'
                } width="100%" justify="space-between" >
                    <Text color={'white'} fontSize='3xl' alignSelf={'start'} w={'500px'} fontWeight={'bold'} >TheTangible Life - NFT-based Video Streaming </Text>
                    <Text color={'white'} fontSize='sm' w={'300px'} alignSelf={'start'} fontWeight={'semibold'} >This dapp allows you to generate embed code for NFT-based video streaming </Text>
                    <Spacer mt={'16px'} />
                    <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                        {/* create a button to for uploading file */}
                        {/* @ts-ignore */}
                        <UploadForm />
                    </Flex>
                    <Spacer mt={'8px'} />

                    {/* <Text color={'white'}>{videoId}</Text> */}

                </Flex>

         

        </>
    )
}