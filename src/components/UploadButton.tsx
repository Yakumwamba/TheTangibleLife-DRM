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
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const onSubmit = handleSubmit((data) => {
    // @ts-ignore
    console.log(data.file_)
    uploadVideoViaPresignedUrl(data.file_)

  })
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState(null)
  const [fileToUpload, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(null)
  const validateFiles = (value: FileList) => {
    if (value.length < 1) {

      return 'Files is required'
    }
    for (const videoFile of Array.from(value)) {
      const fsMb = videoFile.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (!fileToUpload || fileToUpload === null) {
        // @ts-ignore
        setFile(videoFile)

      }

      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb'
      }


    }
    return true
  }
  // @ts-ignore
  async function uploadVideoViaPresignedUrl(file) {

    // read file contents and attach to body 


    var options = {
      'method': 'PUT',
      'url': videoUrl,
      'headers': {
        'mode': 'cors',
        'Content-Type': 'application/octet-stream'
      },
      'body': fileToUpload

    };

    await fetch(options.url, options).then(async (response) => {

      const resp = await response
      console.log(resp.body)
      console.log("Transcoding video")

      //setVideoUrl( response.json())

    }).then(async (data) => {
      console.log(data);
      if (videoId) {
        transcodeVideoId()
      }
    }
    ).catch(err => {
      alert(err)
    }
    )



  }
  //@ts-ignore
  const uploadToSupabase = async (file) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('tangible-bucket').upload(filePath, file).then(async result => {
        console.log(result)
        // @ts-ignore
        setUploaded(result.data.Key)
        // @ts-ignore
        console.log("url is " + result.data.Key)
        return result
      })



      if (uploadError) {
        console.log("Supabase Error", uploadError)
        throw uploadError
      }
      console.log("Uploaded to supabase")

      console.log("creating signed URL please wait ....")


      // onUpload(filePath)
      // $ts-ignore
    } catch (error) {
      console.log(error)
      // @ts-ignore
      alert(error.message)
    } finally {
      // setUploading(false)
    }
  }
  // @ts-ignore
  async function transcodeVideoId() {
    var options = {
      'method': 'POST',
      'url': `https://api.thetavideoapi.com/video/${videoId}`,
      'headers': {
        'x-tva-sa-id': 'srvacc_bskvbccj4far1na8eic0ij7r9',
        'x-tva-sa-secret': 'z8czbpj3vjztgut9tqnspestygf0abz6',
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
      alert(err)
    }
    )
  }
  // @ts-ignore
  async function transcodeVideoExternalUrl(url) {
    var options = {
      'method': 'GET',
      'url': 'https://api.thetavideoapi.com/video/video_ctc1whaxnnfsicd8a6xibzq9kd',
      'headers': {
        'x-tva-sa-id': 'srvacc_bskvbccj4far1na8eic0ij7r9',
        'x-tva-sa-secret': 'z8czbpj3vjztgut9tqnspestygf0abz6',
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({ "source_uri": `${url}`, "playback_policy": "public" })

    };

    fetch(options.url, options).then(async (response) => {

      const resp = await response.json()
      console.log(resp)

      //setVideoUrl( response.json())

    }).then(async (data) => {
      console.log(data);
    }
    ).catch(err => {
      alert(err)
    }
    )

  }

  function checkProgress() {
    var options = {
      'method': 'GET',
      'url': 'https://api.thetavideoapi.com/video/video_ctc1whaxnnfsicd8a6xibzq9kd',
      'headers': {
        'x-tva-sa-id': 'srvacc_bskvbccj4far1na8eic0ij7r9',
        'x-tva-sa-secret': 'z8czbpj3vjztgut9tqnspestygf0abz6',
        'Content-Type': 'application/json'
      },
      // 'body': JSON.stringify({"source_uri":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4","playback_policy":"public"})

    };

    fetch(options.url, options).then(async (response) => {

      const resp = await response.json()
      console.log(resp)

      //setVideoUrl( response.json())

    }).then(async (data) => {
      console.log(data);
    }
    ).catch(err => {
      alert(err)
    }
    )
  }

  async function requestPresignedUrl() {
    var options = {
      'method': 'POST',
      'url': 'https://api.thetavideoapi.com/upload',
      'headers': {
        'x-tva-sa-id': 'srvacc_bskvbccj4far1na8eic0ij7r9',
        'x-tva-sa-secret': 'z8czbpj3vjztgut9tqnspestygf0abz6'
      },

    };
    await fetch(options.url, options).then(async (response) => {
      const presignedUrl = await response.json()
      console.log("requested presigned url", presignedUrl)
      setVideoUrl(presignedUrl.body.uploads[0].presigned_url)
      setVideoId(presignedUrl.body.uploads[0].id)
      console.log("presigned url", presignedUrl.body.uploads[0].presigned_url, "videoId", presignedUrl.body.uploads[0].id)
      //setVideoUrl( response.json())

    }).then(async (data) => {
      console.log(data);
    }
    )

  }
// @ts-ignore
  useEffect(async () => {
    console.log("File to upload is ", fileToUpload)
    // uploadVideoViaPresignedUrl(fileToUpload)

    uploadToSupabase(fileToUpload)
    if (uploaded !== null ) {
      alert("The file was uploaed successfully")
      setUploaded(null)
      const { signedURL, error } = await supabase
        .storage
        .from('tangible-bucket')
        .createSignedUrl(uploaded, 60).then(async result => {
          console.log(result)
          // @ts-ignore
          setUploaded(result.data.Key)
          // @ts-ignore
          console.log(result.data.Key)
          return result
        })
    
  
    }
  }, [fileToUpload, uploaded])

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
                requestPresignedUrl()
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
          <Button
            alignSelf={'end'}
            justifySelf={'end'}
            // isLoading
            // loadingText='Submitting'
            rightIcon={<Icon color={'white'} h={6} w={6} as={FiSave} />}
            colorScheme='green'
            // @ts-ignore
            // onClick={uploadVideoViaPresignedUrl}
            bgColor={'#F88487'}
            justifyContent={'center'}
            fontWeight={'semibold'}
            type='submit'
          >
            {/* <Link href='/generated-iframe' >Submit </Link> */} Upload
          </Button>
        </FormControl>


      </form>
    </>
  )
}

export default UploadButton