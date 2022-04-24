


// @ts-ignore
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, Select, Spacer, Text } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiVideo, FiSave, FiSend, FiHelpCircle } from 'react-icons/fi'
import { supabase } from '../data/supabase'
import VisuallyHidden from '@reach/visually-hidden'
import LoadingOverlay from 'react-loading-overlay-ts';
import { useNavigate } from "react-router-dom";


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


  const submitButton = useRef()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState(null)
  const [fileToUpload, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(null)
  const [isActive, setActive] = useState(false)
  const [supabaseURl, setSupabaseURL] = useState(null)
  const [doneUpload, setDoneUpload] = useState(false)
  const [uploadProgress, setUploadedProgress] = useState(0)


  let navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    //uploadVideoViaPresignedUrl(data.file_)
    //requestPresignedUrl()
    uploadToSupabase(fileToUpload)
    //checkProgress("video_c8b1xqbet8reedizacq4j94ni9")

  })

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {

      return 'Files is required'
    }
    for (const videoFile of Array.from(value)) {
      const fsMb = videoFile.size / (1024 * 1024)
      const MAX_FILE_SIZE = 20
      if (!fileToUpload || fileToUpload === null) {
        // @ts-ignore
        setFile(videoFile)

      }

      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 20mb'
      }


    }
    return true
  }

  //@ts-ignore
  const uploadToSupabase = async (file) => {
    setActive(true)
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
        if (result.data.Key) {
          console.log("Created the url =========>", result)
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
              console.log("supabase url set" + result.data?.signedURL)
            })

          // @ts-ignore
          console.log(result.data.Key)

        }
        setSupabaseURL(null)
        return result
      })

      if (uploadError) {
        console.log("Supabase Error while uploading => ", uploadError)
        setActive(false)

      }
      console.log("Uploaded to supabase")

      console.log("creating signed URL please wait ....")


      // onUpload(filePath)
      // $ts-ignore
    } catch (error) {
      setActive(false)
    }
  }
  // @ts-ignore
  async function transcodeVideoId() {
    const id = process.env.thetaID
    const secrete = process.env.thetaSecrete
    var options = {
      'method': 'POST',
      'url': `https://api.thetavideoapi.com/video/${videoId}`,
      'headers': {
        'x-tva-sa-id': `${id}`,
        'x-tva-sa-secret': `${secrete}`,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({ "source_upload_id": `${videoId}`, "playback_policy": "public" })

    };

    await fetch(options.url, options).then(async (response) => {

      const resp = await response.json()
      console.log(resp)

      //setVideoUrl( response.json())

    }).then(async (data) => {
      console.log(data);
    }
    ).catch(err => {
      console.error(err)
    }
    )
  }
  // @ts-ignore
  async function transcodeVideoExternalUrl(url) {
    const id = process.env.thetaID
    const secrete = process.env.thetaSecrete
    var options = {
      'method': 'POST',
      'url': 'https://api.thetavideoapi.com/video',
      'headers': {
        'x-tva-sa-id': `srvacc_bskvbccj4far1na8eic0ij7r9`,
        'x-tva-sa-secret': `z8czbpj3vjztgut9tqnspestygf0abz6`,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({ "source_uri": `${url}`, "playback_policy": "public" })
    };

    await fetch(options.url, options).then(async (response) => {
      console.log("Transcoding Video please wait...")

      const resp = await response.json()
      if (resp.body.videos[0].id) {
        console.log("Setting video Id =>", resp.body.videos[0].id)
        setVideoId(resp.body.videos[0].id)

        console.log(resp)


        // console.log("Setting Video id to ", videoId)
        // setVideoId(videoId)
      } else {

        console.log("Error while transcoding video")

      }


    }).then(async (data) => {

    }
    ).catch(err => {
      console.log("Error while Transcoding Video from external URL", err)
    }
    )

  }


  // @ts-ignore
  async function checkProgress(videoId) {
    const id = process.env.thetaID
    const secrete = process.env.thetaSecrete
    var options = {
      'method': 'GET',
      'url': `https://api.thetavideoapi.com/video/${videoId}`,
      'headers': {
        'x-tva-sa-id': `srvacc_bskvbccj4far1na8eic0ij7r9`,
        'x-tva-sa-secret': `z8czbpj3vjztgut9tqnspestygf0abz6`
      },

    };

    if (!doneUpload) {
      await fetch(options.url, options).then(async (response) => {
        console.log("Checking progress for video id ....." + videoId)
        const resp = await response.json()
        console.log("====== Progress REsponse ======== ", resp.body.videos)
        
       

        if (resp.body.videos[0].progress == 100) {

          setActive(false)
          setDoneUpload(true)
          navigate('generated-iframe')
          console.log("Player URI for the Iframe => ", resp.body.videos[0].player_uri)
          console.log("Resolution => ", resp.body.videos[0].resolution)
          console.log("NFT Colletion => ", resp.body.videos[0].nft_colletion)
          console.log("Playback policy => ", resp.body.videos[0].player_uri)
          console.log("state => ", resp.body.videos[0].state)
          return
        } else {
          setUploadedProgress(resp.body.videos[0].progress)
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

    return



  }

  async function requestPresignedUrl() {
    const id = process.env.thetaID
    const secrete = process.env.thetaSecrete
    var options = {
      'method': 'POST',
      'url': 'https://api.thetavideoapi.com/upload',
      'headers': {
        'x-tva-sa-id': `srvacc_bskvbccj4far1na8eic0ij7r9`,
        'x-tva-sa-secret': `z8czbpj3vjztgut9tqnspestygf0abz6`
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
  useEffect(() => {
    // console.log("File to upload is ", fileToUpload)
    // // uploadVideoViaPresignedUrl(fileToUpload)

    if (supabaseURl) {
      console.log("Awaiting video Transcoding...")
      console.log("External URL to be transcoded is ", supabaseURl)
      transcodeVideoExternalUrl(supabaseURl)
      setSupabaseURL(null)
    }

    if (videoId !== null) {
      if (!doneUpload) {
        console.log("Checking progress for Video ==> " + videoId)
        setTimeout(() => {
          checkProgress(videoId)
        }
          , 5000)
        //setVideoId(null)
        console.log("Upload progress", uploadProgress)
      }




    }


  }, [supabaseURl, videoId, uploadProgress])


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
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.file_} isRequired>

            <FileUpload
              accept={'video/*'}
              multiple
              register={register('file_', { validate: validateFiles })}
            >

              <Button
                // @ts-ignore
                type='file'
                id="single"
                accept="video/*"
                bgGradient='linear(to-r, teal.500, green.500)' textColor={'white'} leftIcon={<Icon as={FiVideo} />}>
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
            <Flex direction={'row'} justifyContent={'end'} >
              <Button
                alignSelf={'end'}

                // isLoading
                // loadingText='Submitting'
                rightIcon={<Icon color={'white'} h={6} w={6} as={FiSave} />}
                colorScheme='green'
                // @ts-ignore
                bgColor={'#F88487'}
                onClick={() => {
                  onSubmit()
                }
                }
                justifyContent={'center'}
                fontWeight={'semibold'}

              >
                {/* <Link href='/generated-iframe' >Submit </Link> */} Upload
              </Button>
            </Flex>

          </FormControl>


        </form>
      </LoadingOverlay>
    </>
  )
}

export default UploadButton