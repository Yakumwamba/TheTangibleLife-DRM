/* eslint-disable jsx-a11y/iframe-has-title */
import { Textarea, Text, Box, Button, Flex, Spacer, useToast, Link } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { CopyIcon } from '@chakra-ui/icons'

import {

  useParams
} from "react-router-dom";
// @ts-ignore
export default function GenerateEmbedCode() {
  const toast = useToast()
  const [iframe, setIframe] = useState('')

  const data = useParams()

  const thetaSource = `https://player.thetavideoapi.com/video/${data.video}`

  useEffect(() => {
    const iframeCode = `<iframe src="https://player.thetavideoapi.com/video/${data.video}"
    width="100%"
    height="100%"
    />`

    
    setIframe(iframeCode)



    console.log(data.video)
  }
  )
  // @ts-ignore
  async function uploadFile(file) {
    console.log("Uploading a file")
    // @ts-ignore
    // contract.methods.mint(account, 0).send({ from: account, gas: 1000000 })

    let options = {
      'method': 'PUT',

      'headers': {
        'Content-Type': 'webm/mp4',
      },
      body: file

    };
    await fetch("https://storage.googleapis.com/files.thetavideoapi.com/srvacc_bskvbccj4far1na8eic0ij7r9/upload_wheiz1zh59bsq4xuvktnjwycr?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=prod-tva-dispatcher-sa%40prod-theta-video-api.iam.gserviceaccount.com%2F20220420%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220420T225645Z&X-Goog-Expires=901&X-Goog-SignedHeaders=content-type%3Bhost&X-Goog-Signature=2c3ac50c5e267774b5a2dbb5d808eb542f6b78552da17093d1a6e74abb2be31ebbd40c7f976fa70875a08701a41e092703b1a5e2c0dfb25b74cdf7d0b431b698b60c82b622bcc7e4054342631ea6e563f11627ccee500133f710f7a5b80960f77908452f4f557d8a4867c2d25396cb9368a2443b5375729a9d6e56de58bc7f900a865076f812eabacbf056c3c238e19776f22fe2d2bd7ed01a67895d6bb5aec12cbc245d6f8a05ef12d8c8148c5f2c0fab3b344ca1729ee18145fcac837fe28bf836ca30e6dcebee70c3dd68d1272d4c4355dd3a20d98017c21428a7aa48d39b95adb95f20571309745153fa743694e310653f76ff6627eb3d8f7378964d6cfa", options).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    });
  }


  return (
    <>


      <Flex alignItems={'end'} flexDirection={'column'} justify="space-between" width={'40%'} height={'200px'} >
        <Box >
          <Flex flexDirection={'row'} justifyContent="between"  >
            <Text fontWeight={'semibold'} color={'white'} mb='8px'>Generated Embed Code: </Text>
            <Spacer mt={'8px'} />
            <CopyIcon fontSize={25} onClick={(e) => {

              navigator.clipboard.writeText(iframe)
              toast({
                title: `iFrame copied`,
                status: 'success',
                isClosable: true,
              })
            }} color={'white'} />
          </Flex>
        </Box>


        <Textarea
          placeholder={iframe != '' ? iframe : `Upload a video to generate embed code`}
          size='sm'
          h="80%"

        ></Textarea>
        <Spacer mt={'8px'} />
        <Flex alignItems={'end'} direction={'column'} alignSelf="end">
          <Button
            // isLoading
            // loadingText='Submitting'

            colorScheme='red'
            //@ts-ignore

            justifyContent={'center'}
          >
            <Link href="/" >Reset</Link>

          </Button>
        </Flex>
        <Spacer mt={'8px'} />
        <Box id="iframeLoader" >

          <iframe src={thetaSource}
            width="540px"
            height="300px"
          />
        </Box>
      </Flex>


    </>
  )
}