


// @ts-ignore
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, Select, Spacer, Text } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiVideo, FiSave, FiSend, FiHelpCircle } from 'react-icons/fi'
import { supabase } from '../data/supabase'
import VisuallyHidden from '@reach/visually-hidden'

type FileUploadProps = {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  children?: ReactNode
}

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void }

  const handleClick = () => inputRef.current?.click()

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
      />
      <>
        {children}
      </>
    </InputGroup>
  )
}

type FormValues = {
  file_: FileList
}

const UploadButton = () => {

  const id = process.env.thetaID
  const secrete = process.env.thetaSecrete

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState(null)
  const [fileToUpload, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(null)

  const [supabaseURl, setSupabaseURL] = useState(null)



  const onSubmit = handleSubmit((data) => {


    
    //uploadVideoViaPresignedUrl(data.file_)
     uploadToSupabase(fileToUpload)

  })

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {

      return 'Files is required'
    }
    for (const videoFile of Array.from(value)) {
      const fsMb = videoFile.size / (1024 * 1024)
      const MAX_FILE_SIZE =  100
      if (!fileToUpload || fileToUpload === null) {
        // @ts-ignore
        setFile(videoFile)

      }

      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 100mb'
      }


    }
    return true
  }

  //@ts-ignore
  const uploadToSupabase = async (file) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
// @ts-ignore
      let { uploadError } = await supabase.storage.from('tangible-bucket').upload(filePath, file).then(async result => {
        console.log(result)
        // @ts-ignore
        setUploaded(result.data.Key.split('/').pop())
        // @ts-ignore
        console.log("url is " + result.data.Key.split('/').pop())


        // @ts-ignore
        if(result.data.Key) {
          console.log("Created the url =========>" , result)
          // @ts-ignore
          //setUploaded(result.data.Key)
       await supabase
          .storage
          .from('tangible-bucket')
          //@ts-ignore
          .createSignedUrl(result.data.Key.split('/').pop(), 60).then(async result => {
  
            console.log(result.data?.signedURL)
            // @ts-ignore
            setSupabaseURL(result.data?.signedURL)

          })
  
          // @ts-ignore
          console.log(result.data.Key)
        }

     



        return result
      })



      if (uploadError) {
        console.log("Supabase Error while uploading => ", uploadError)
        
      }
      console.log("Uploaded to supabase")

      console.log("creating signed URL please wait ....")


      // onUpload(filePath)
      // $ts-ignore
    } catch (error) {
      
    } finally {
      // setUploading(false)
    }
  }
 




  // @ts-ignore
  async function transcodeVideoExternalUrl(url) {
    var options = {
      'method': 'POST',
      'url': 'https://api.thetavideoapi.com/video',
      'headers': {
        'x-tva-sa-id': `${id}`,
        'x-tva-sa-secret': `${secrete}`,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({ "source_uri": `${url}`, "playback_policy": "public" })

    };



    await fetch(options.url, options).then(async (response) => {
      console.log("Transcoding Video please wait......")
      const resp = await response.json()
       const videoId = resp.body.videos[0].id
      console.log(resp)
      console.log("Setting Video id to " , videoId)
      // @ts-ignore
      setVideoId(videoId)
      
    
    
      //setVideoUrl( response.json())

          }).then(async (data) => {
     
    }
    ).catch(err => {
      console.log("Error while Transcoding Video from external URL", err)
    }
    )

    // if(videoId !== '') {
    //   setInterval(async () => {
    //     await checkProgress(videoId)
    //   }, 5000)
    // }
   

  }


  // @ts-ignore
  async function checkProgress(videoId) {

    var options = {
      'method': 'GET',
      'url': `https://api.thetavideoapi.com/video/${videoId}`,
      'headers': {
        'x-tva-sa-id': `${id}`,
        'x-tva-sa-secret': `${secrete}`
      },
    

    };

    await fetch(options.url, options).then(async (response) => {
      console.log("Checking progress for video id ....." + videoId)
      const resp = await response.json()
      console.log("====== Progress REsponse ======== ", resp.body.videos)
      if(resp.body.videos[0].progress == 99.9) {
        console.log("Uploading to Theta Network almost done:" , resp.body.videos[0].progress)
      }
      //setVideoUrl( response.json())

    }).then(async (data) => {
      console.log(data);
    }
    ).catch(err => {
    console.log("Error in checking the video Pogress", err)
    }
    )
  }

  async function requestPresignedUrl() {

   

    var options = {
      'method': 'POST',
      'url': 'https://api.thetavideoapi.com/upload',
      'headers': {
        'x-tva-sa-id': `${id}`,
        'x-tva-sa-secret': `${secrete}`
      },

    };
    await fetch(options.url, options).then(async (response) => {
      const presignedUrl = await response.json()
      console.log("requested presigned url", presignedUrl)
      setVideoUrl(presignedUrl.body.uploads[0].presigned_url)
      //setVideoId(presignedUrl.body.uploads[0].id)
      console.log("presigned url", presignedUrl.body.uploads[0].presigned_url, "videoId", presignedUrl.body.uploads[0].id)
      //setVideoUrl( response.json())

    }).then(async (data) => {
      console.log(data);
    }
    )

  }
// @ts-ignore
  useEffect(async () => {
    // console.log("File to upload is ", fileToUpload)
    // // uploadVideoViaPresignedUrl(fileToUpload)

    if(supabaseURl) {
      console.log("Awaiting video Transcoding...")
      console.log("External URL to be transcoded is ", supabaseURl)
      await transcodeVideoExternalUrl(supabaseURl)
    }

     
  }, [supabaseURl])

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.file_} isRequired>

          <FileUpload
            accept={'image/*'}
            multiple
            register={register('file_', { validate: validateFiles })}
          >

            <Button
              // @ts-ignore
              type='file'
              id="single"
              accept="video/*"
              onChange={(event) => {
                alert("File selected")
              }}
              onClick={() => {
                //requestPresignedUrl()
              }} bgGradient='linear(to-r, teal.500, green.500)' textColor={'white'} leftIcon={<Icon as={FiVideo} />}>
              Upload video
            </Button>

          </FileUpload>

          <Text color={'white'}>
            {errors.file_ && errors?.file_.message}
          </Text>

          <Flex flexDirection={'row'} w={'500px'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
            <Text fontStyle={'italic'} color={'white'} mb='8px'>(Optional) Hash of any Required NFT (see how)  <Icon color={'white'} h={6} w={6} as={FiHelpCircle} />
            </Text>
            {/* @ts-ignore */}

          </Flex>
          <Spacer mt={'8px'} />
          <Input padding={'4px'} textColor={'white'} variant='outline' placeholder='0x1234...' />

          <Flex flexDirection={'row'} alignSelf={'start'} justify="space-between" alignItems={'center'} >
            <Text color={'white'} mb='8px'>Select Dimensions
            </Text>
          </Flex>

          <Select padding={'4px'} placeholder='560 x 315' size='md' color={'gray'} borderRadius={'6px'}>
            <option value='small'>640 x 480</option>
            <option value='medium'>1280 x 960</option>
            <option value='large'>1920 x 1080</option>
          </Select>
          <Spacer mt={'8px'} />
          <Flex direction={'row'}justifyContent={'end'} > 
          <Button
            alignSelf={'end'}
            
            // isLoading
            // loadingText='Submitting'
            rightIcon={<Icon color={'white'} h={6} w={6} as={FiSave} />}
            colorScheme='green'
            // @ts-ignore
            bgColor={'#F88487'}
            justifyContent={'center'}
            fontWeight={'semibold'}
           type='submit'
          >
            {/* <Link href='/generated-iframe' >Submit </Link> */} Upload
          </Button>
          </Flex>
          
        </FormControl>


      </form>
    </>
  )
}

export default UploadButton