import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup, Text } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiVideo, FiSend } from 'react-icons/fi'

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

  useEffect(() => {
    console.log("File to upload is ", fileToUpload)
    uploadVideoViaPresignedUrl(fileToUpload)
  }, [fileToUpload])

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.file_} isRequired>

          <FileUpload
            accept={'image/*'}
            multiple
            register={register('file_', { validate: validateFiles })}
          >
            <Button onClick={() => {
              requestPresignedUrl()
            }} bgGradient='linear(to-r, teal.500, green.500)' textColor={'white'} leftIcon={<Icon as={FiVideo} />}>
              Upload video
            </Button>
          </FileUpload>

          <Text color={'white'}>
            {errors.file_ && errors?.file_.message}
          </Text>
        </FormControl>

        <button type='submit' color='white'>Upload</button>
      </form>
    </>
  )
}

export default UploadButton