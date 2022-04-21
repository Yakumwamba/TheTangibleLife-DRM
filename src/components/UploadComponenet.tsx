import { Textarea, Text, Box, Button, Flex, Spacer, Input, Select, Divider } from "@chakra-ui/react"
import React from "react"
import { CopyIcon } from '@chakra-ui/icons'


// @ts-ignore
export default function UploadVideo({}) {
    let [value, setValue] = React.useState('')
    // @ts-ignore
    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }
    return (
        <>
            
            <Box h={'200px'} w='25%'  paddingBottom={100} >
                <Flex alignItems={'end'} flexDirection={
                    'column'
                } justify="space-between" >
                    <Text color={'white'}  fontSize='2xl' >TheTangible Life - Digital Rights Management (Dapp)</Text>
                    <Spacer mt={'16px'} />
                    <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                    {/* create a button to for uploading file */}
                        
                     <Button   color={'green'}> Upload Video <Input type={'file'} padding={'4px'} variant='outline' placeholder='0x1234...' /></Button>
                    </Flex>
                    <Spacer mt={'8px'} />
                  
                    <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
                        <Text color={'white'} mb='8px'>(Optional) Hash of any Required NFT (see how)
                        </Text>
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
                
                </Flex>
            </Box>

        </>
    )
}